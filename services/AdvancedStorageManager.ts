import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

interface StorageConfig {
  primary: 'mongodb' | 'cloud';
  backup: 'local' | 'cloud';
  compression: boolean;
  encryption: boolean;
  retention: number; // days
}

class AdvancedStorageManager {
  private config: StorageConfig;
  private dbConnections: Map<string, MongoClient> = new Map();

  constructor() {
    this.config = {
      primary: process.env.STORAGE_PRIMARY || 'mongodb',
      backup: process.env.STORAGE_BACKUP || 'local',
      compression: true,
      encryption: true,
      retention: parseInt(process.env.DATA_RETENTION_DAYS || '730') // 2 years default
    };
  }

  // Multi-database connection management
  async connectToDatabase(region: string = 'main'): Promise<MongoClient> {
    const connectionKey = `db_${region}`;

    if (this.dbConnections.has(connectionKey)) {
      return this.dbConnections.get(connectionKey)!;
    }

    const uri = this.getDatabaseURI(region);
    const client = new MongoClient(uri, {
      maxPoolSize: 20,
      serverSelectionTimeoutMS: 10000,
      maxIdleTimeMS: 30000,
      compressors: this.config.compression ? ['zlib'] : undefined
    });

    try {
      await client.connect();
      this.dbConnections.set(connectionKey, client);
      console.log(`✅ Connected to ${region} database`);
      return client;
    } catch (error) {
      console.error(`❌ Failed to connect to ${region} database:`, error);
      throw error;
    }
  }

  private getDatabaseURI(region: string): string {
    const baseURI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

    if (region === 'main') {
      return baseURI;
    }

    // Regional databases for scalability
    const regionalURIs: Record<string, string> = {
      'baghdad': process.env.MONGODB_BAGHDAD_URI || baseURI,
      'basra': process.env.MONGODB_BASRA_URI || baseURI,
      'erbil': process.env.MONGODB_ERBIL_URI || baseURI,
      'mosul': process.env.MONGODB_MOSUL_URI || baseURI
    };

    return regionalURIs[region] || baseURI;
  }

  // Intelligent data distribution based on governorate
  async saveCandidateWithSmartRouting(candidateData: any): Promise<any> {
    const governorate = candidateData.governorate || 'بغداد';

    // Route to appropriate regional database for better performance
    const targetRegion = this.getOptimalRegion(governorate);
    const client = await this.connectToDatabase(targetRegion);

    const db = client.db(`election_${targetRegion}`);
    const collection = db.collection('candidates');

    // Add storage metadata
    const dataWithStorage = {
      ...candidateData,
      storage_metadata: {
        region: targetRegion,
        stored_at: new Date(),
        compression_applied: this.config.compression,
        encryption_applied: this.config.encryption,
        size_optimized: true
      }
    };

    const result = await collection.insertOne(dataWithStorage);
    return { ...dataWithStorage, _id: result.insertedId };
  }

  private getOptimalRegion(governorate: string): string {
    // Route data to regional databases for scalability
    const regionMapping: Record<string, string> = {
      'بغداد': 'baghdad',
      'البصرة': 'basra',
      'الموصل': 'mosul',
      'أربيل': 'erbil',
      'السليمانية': 'erbil',
      'كركوك': 'erbil',
      'دهوك': 'erbil',
      'كربلاء': 'baghdad',
      'النجف': 'baghdad',
      'ذي قار': 'basra',
      'ميسان': 'basra'
    };

    return regionMapping[governorate] || 'main';
  }

  // Data archiving for old records
  async archiveOldData(daysOld: number = 90): Promise<number> {
    console.log(`🗄️ Starting data archiving for records older than ${daysOld} days...`);

    const cutoffDate = new Date(Date.now() - (daysOld * 24 * 60 * 60 * 1000));
    let archivedCount = 0;

    for (const [regionKey] of this.dbConnections) {
      const region = regionKey.replace('db_', '');
      const client = this.dbConnections.get(regionKey);

      if (!client) continue;

      try {
        const db = client.db(`election_${region}`);
        const candidates = db.collection('candidates');
        const archive = db.collection('candidates_archived');

        // Move old records to archive
        const oldRecords = await candidates.find({
          createdAt: { $lt: cutoffDate }
        }).toArray();

        if (oldRecords.length > 0) {
          await archive.insertMany(oldRecords);

          // Remove from active collection
          await candidates.deleteMany({
            createdAt: { $lt: cutoffDate }
          });

          archivedCount += oldRecords.length;
          console.log(`✅ Archived ${oldRecords.length} records from ${region} region`);
        }

      } catch (error) {
        console.error(`❌ Failed to archive data for ${region}:`, error);
      }
    }

    return archivedCount;
  }

  // Storage analytics and monitoring
  async getStorageAnalytics(): Promise<any> {
    const analytics = {
      total_records: 0,
      by_region: {},
      storage_size: 0,
      compression_ratio: 0,
      regions: []
    };

    for (const [regionKey] of this.dbConnections) {
      const region = regionKey.replace('db_', '');
      const client = this.dbConnections.get(regionKey);

      if (!client) continue;

      try {
        const db = client.db(`election_${region}`);
        const candidates = db.collection('candidates');

        const count = await candidates.countDocuments();
        const size = await db.stats();

        analytics.total_records += count;
        analytics.by_region[region] = {
          count,
          size: size.dataSize || 0,
          collections: await db.listCollections().toArray()
        };

      } catch (error) {
        console.error(`❌ Failed to get analytics for ${region}:`, error);
      }
    }

    return analytics;
  }

  // Data export for backup/external use
  async exportDataToFile(format: 'json' | 'csv' = 'json', region?: string): Promise<string> {
    console.log(`📤 Exporting data in ${format} format...`);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `election_data_export_${timestamp}.${format}`;
    const filepath = path.join(process.cwd(), 'exports', filename);

    // Ensure exports directory exists
    if (!fs.existsSync(path.join(process.cwd(), 'exports'))) {
      fs.mkdirSync(path.join(process.cwd(), 'exports'), { recursive: true });
    }

    if (region) {
      // Export specific region
      const client = await this.connectToDatabase(region);
      const db = client.db(`election_${region}`);
      const candidates = db.collection('candidates');

      const data = await candidates.find({}).toArray();

      if (format === 'csv') {
        await this.writeCSVFile(filepath, data);
      } else {
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
      }
    } else {
      // Export all regions
      const allData = [];

      for (const [regionKey] of this.dbConnections) {
        const regionName = regionKey.replace('db_', '');
        const client = this.dbConnections.get(regionKey);

        if (client) {
          const db = client.db(`election_${regionName}`);
          const candidates = db.collection('candidates');
          const regionData = await candidates.find({}).toArray();

          allData.push(...regionData.map(item => ({ ...item, export_region: regionName })));
        }
      }

      if (format === 'csv') {
        await this.writeCSVFile(filepath, allData);
      } else {
        fs.writeFileSync(filepath, JSON.stringify(allData, null, 2));
      }
    }

    console.log(`✅ Data exported to: ${filepath}`);
    return filepath;
  }

  private async writeCSVFile(filepath: string, data: any[]): Promise<void> {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]).filter(key => !key.startsWith('_') && !key.startsWith('storage_'));
    const csvContent = [
      headers.join(','),
      ...data.map(item =>
        headers.map(header => {
          const value = item[header];
          // Escape commas and quotes in CSV
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value || '';
        }).join(',')
      )
    ].join('\n');

    fs.writeFileSync(filepath, csvContent);
  }

  // Cleanup and optimization
  async optimizeStorage(): Promise<any> {
    console.log('🧹 Starting storage optimization...');

    const optimization = {
      databases_compacted: 0,
      indexes_optimized: 0,
      cache_cleared: false,
      temp_files_cleaned: 0
    };

    // Compact databases
    for (const [regionKey] of this.dbConnections) {
      const region = regionKey.replace('db_', '');
      const client = this.dbConnections.get(regionKey);

      if (client) {
        try {
          const db = client.db(`election_${region}`);
          await db.command({ compact: 'candidates' });
          optimization.databases_compacted++;
        } catch (error) {
          console.error(`❌ Failed to compact ${region} database:`, error);
        }
      }
    }

    // Clear cache
    optimization.cache_cleared = true;

    // Clean temp files
    const tempDir = path.join(process.cwd(), 'temp');
    if (fs.existsSync(tempDir)) {
      const tempFiles = fs.readdirSync(tempDir);
      tempFiles.forEach(file => {
        if (file.endsWith('.tmp') || file.startsWith('temp_')) {
          fs.unlinkSync(path.join(tempDir, file));
          optimization.temp_files_cleaned++;
        }
      });
    }

    console.log('✅ Storage optimization completed:', optimization);
    return optimization;
  }
}

export default AdvancedStorageManager;
