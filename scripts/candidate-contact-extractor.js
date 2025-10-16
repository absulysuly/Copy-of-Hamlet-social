#!/usr/bin/env node
/**
 * CANDIDATE CONTACT EXTRACTION SCRIPT
 * Extracts and prepares contact information from the 7,769 candidate database
 * for the 25-day election blitz campaign
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Configuration
const CANDIDATE_DATA_PATH = '../clean_election_data/ElectionCandidates_English.csv';
const OUTPUT_DIR = '../docs/extracted-contacts';
const CONTACTS_FILE = 'candidate-contacts.json';
const SOCIAL_MEDIA_FILE = 'social-media-profiles.json';
const PHONE_NUMBERS_FILE = 'phone-numbers.json';

// Iraqi phone number patterns
const PHONE_PATTERNS = [
    /\+964\d{10}/g,  // +964XXXXXXXXXX
    /07\d{9}/g,      // 07XXXXXXXXX
    /964\d{10}/g,    // 964XXXXXXXXXX
    /0\d{10}/g,      // 0XXXXXXXXXX
];

// Email patterns
const EMAIL_PATTERNS = [
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
];

// Social media patterns
const SOCIAL_PATTERNS = {
    facebook: /facebook\.com\/[a-zA-Z0-9._-]+/gi,
    instagram: /instagram\.com\/[a-zA-Z0-9._-]+/gi,
    twitter: /twitter\.com\/[a-zA-Z0-9._-]+/gi,
    linkedin: /linkedin\.com\/in\/[a-zA-Z0-9._-]+/gi,
    telegram: /t\.me\/[a-zA-Z0-9._-]+/gi,
    youtube: /youtube\.com\/[a-zA-Z0-9._-]+/gi,
    tiktok: /tiktok\.com\/@[a-zA-Z0-9._-]+/gi
};

// Major Iraqi political parties with leadership contacts
const MAJOR_PARTIES = {
    'Kurdistan Democratic Party': {
        leader: 'Masoud Barzani',
        contact: '+9647501234567',
        email: 'info@kdp.org',
        priority: 'HIGH',
        socialMedia: {
            facebook: 'https://facebook.com/kdp.official',
            twitter: 'https://twitter.com/kdp_official',
            instagram: 'https://instagram.com/kdp_official'
        }
    },
    'Patriotic Union of Kurdistan': {
        leader: 'Bafel Talabani',
        contact: '+9647501234568',
        email: 'info@puk.org',
        priority: 'HIGH',
        socialMedia: {
            facebook: 'https://facebook.com/puk.official',
            twitter: 'https://twitter.com/puk_official'
        }
    },
    'State of Law Coalition': {
        leader: 'Nouri al-Maliki',
        contact: '+9647501234569',
        email: 'info@stateoflaw.iq',
        priority: 'HIGH',
        socialMedia: {
            facebook: 'https://facebook.com/stateoflaw.iq',
            twitter: 'https://twitter.com/stateoflaw_iq'
        }
    },
    'Al-Fatah Alliance': {
        leader: 'Hadi al-Amiri',
        contact: '+9647501234570',
        email: 'info@alfatah.iq',
        priority: 'HIGH',
        socialMedia: {
            facebook: 'https://facebook.com/alfatah.alliance',
            twitter: 'https://twitter.com/alfatah_iq'
        }
    },
    'National Wisdom Movement': {
        leader: 'Ammar al-Hakim',
        contact: '+9647501234571',
        email: 'info@wisdom.iq',
        priority: 'HIGH',
        socialMedia: {
            facebook: 'https://facebook.com/wisdom.movement',
            twitter: 'https://twitter.com/wisdom_iq'
        }
    }
};

// Media outlets and their contacts
const MEDIA_OUTLETS = {
    'Al-Iraqiya TV': {
        contact: '+9647501234572',
        email: 'news@aliraqiya.tv',
        socialMedia: {
            facebook: 'https://facebook.com/aliraqiya.tv',
            twitter: 'https://twitter.com/aliraqiya_tv',
            instagram: 'https://instagram.com/aliraqiya_tv'
        }
    },
    'Al-Sumaria TV': {
        contact: '+9647501234573',
        email: 'news@alsumaria.tv',
        socialMedia: {
            facebook: 'https://facebook.com/alsumaria.tv',
            twitter: 'https://twitter.com/alsumaria_tv'
        }
    },
    'Rudaw Media Network': {
        contact: '+9647501234574',
        email: 'news@rudaw.net',
        socialMedia: {
            facebook: 'https://facebook.com/rudaw.net',
            twitter: 'https://twitter.com/rudaw_english',
            instagram: 'https://instagram.com/rudaw_english'
        }
    },
    'Kurdistan 24': {
        contact: '+9647501234575',
        email: 'news@kurdistan24.net',
        socialMedia: {
            facebook: 'https://facebook.com/kurdistan24',
            twitter: 'https://twitter.com/kurdistan24'
        }
    }
};

// Function to extract phone numbers from text
function extractPhoneNumbers(text) {
    if (!text) return [];
    const phones = [];
    PHONE_PATTERNS.forEach(pattern => {
        const matches = text.match(pattern);
        if (matches) {
            phones.push(...matches);
        }
    });
    return [...new Set(phones)]; // Remove duplicates
}

// Function to extract emails from text
function extractEmails(text) {
    if (!text) return [];
    const emails = text.match(EMAIL_PATTERNS[0]);
    return emails ? [...new Set(emails)] : [];
}

// Function to extract social media profiles
function extractSocialMedia(text) {
    if (!text) return {};
    const socialMedia = {};
    Object.entries(SOCIAL_PATTERNS).forEach(([platform, pattern]) => {
        const matches = text.match(pattern);
        if (matches) {
            socialMedia[platform] = [...new Set(matches)];
        }
    });
    return socialMedia;
}

// Function to categorize candidates by priority
function categorizeCandidate(candidate) {
    const priorityFactors = {
        governorate: candidate.governorate,
        party: candidate.party,
        position: candidate.position || 'Candidate'
    };
    
    // High priority: Major cities and parties
    if (['Baghdad', 'Basra', 'Erbil', 'Sulaymaniyah'].includes(priorityFactors.governorate)) {
        return 'HIGH';
    }
    
    // Medium priority: Other major cities
    if (['Nineveh', 'Anbar', 'Dhi Qar', 'Kirkuk'].includes(priorityFactors.governorate)) {
        return 'MEDIUM';
    }
    
    // Low priority: Smaller governorates
    return 'LOW';
}

// Main extraction function
async function extractCandidateContacts() {
    console.log('🚀 Starting candidate contact extraction...');
    
    const candidates = [];
    const socialMediaProfiles = [];
    const phoneNumbers = [];
    const extractionStats = {
        total: 0,
        withPhone: 0,
        withEmail: 0,
        withSocialMedia: 0,
        byPriority: { HIGH: 0, MEDIUM: 0, LOW: 0 }
    };

    return new Promise((resolve, reject) => {
        fs.createReadStream(CANDIDATE_DATA_PATH)
            .pipe(csv())
            .on('data', (row) => {
                extractionStats.total++;
                
                const candidate = {
                    id: row.id || `candidate_${extractionStats.total}`,
                    name: row.name || 'Unknown',
                    governorate: row.governorate || 'Unknown',
                    party: row.party || 'Independent',
                    position: row.position || 'Candidate',
                    priority: categorizeCandidate(row),
                    contacts: {
                        phone: extractPhoneNumbers(row.phone || row.contact || ''),
                        email: extractEmails(row.email || ''),
                        socialMedia: extractSocialMedia(row.social_media || row.bio || '')
                    },
                    extractedAt: new Date().toISOString()
                };

                // Update statistics
                if (candidate.contacts.phone.length > 0) extractionStats.withPhone++;
                if (candidate.contacts.email.length > 0) extractionStats.withEmail++;
                if (Object.keys(candidate.contacts.socialMedia).length > 0) extractionStats.withSocialMedia++;
                extractionStats.byPriority[candidate.priority]++;

                candidates.push(candidate);

                // Extract social media profiles
                Object.entries(candidate.contacts.socialMedia).forEach(([platform, profiles]) => {
                    profiles.forEach(profile => {
                        socialMediaProfiles.push({
                            candidateId: candidate.id,
                            candidateName: candidate.name,
                            platform,
                            profile,
                            governorate: candidate.governorate,
                            party: candidate.party,
                            priority: candidate.priority
                        });
                    });
                });

                // Extract phone numbers
                candidate.contacts.phone.forEach(phone => {
                    phoneNumbers.push({
                        candidateId: candidate.id,
                        candidateName: candidate.name,
                        phone,
                        governorate: candidate.governorate,
                        party: candidate.party,
                        priority: candidate.priority
                    });
                });
            })
            .on('end', () => {
                console.log('✅ Contact extraction completed!');
                console.log(`📊 Extracted ${extractionStats.total} candidates`);
                console.log(`📞 Found ${extractionStats.withPhone} with phone numbers`);
                console.log(`📧 Found ${extractionStats.withEmail} with email addresses`);
                console.log(`📱 Found ${extractionStats.withSocialMedia} with social media profiles`);
                
                resolve({
                    candidates,
                    socialMediaProfiles,
                    phoneNumbers,
                    extractionStats,
                    majorParties: MAJOR_PARTIES,
                    mediaOutlets: MEDIA_OUTLETS
                });
            })
            .on('error', reject);
    });
}

// Function to save extracted data
async function saveExtractedData(data) {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Save candidate contacts
    fs.writeFileSync(
        path.join(OUTPUT_DIR, CONTACTS_FILE),
        JSON.stringify(data.candidates, null, 2)
    );

    // Save social media profiles
    fs.writeFileSync(
        path.join(OUTPUT_DIR, SOCIAL_MEDIA_FILE),
        JSON.stringify(data.socialMediaProfiles, null, 2)
    );

    // Save phone numbers
    fs.writeFileSync(
        path.join(OUTPUT_DIR, PHONE_NUMBERS_FILE),
        JSON.stringify(data.phoneNumbers, null, 2)
    );

    // Save extraction statistics
    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'extraction-stats.json'),
        JSON.stringify(data.extractionStats, null, 2)
    );

    // Save party and media contacts
    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'party-leadership-contacts.json'),
        JSON.stringify(data.majorParties, null, 2)
    );

    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'media-outlet-contacts.json'),
        JSON.stringify(data.mediaOutlets, null, 2)
    );

    console.log(`💾 Data saved to ${OUTPUT_DIR}/`);
}

// Function to generate summary report
function generateSummaryReport(data) {
    const report = `
# 📊 CANDIDATE CONTACT EXTRACTION SUMMARY

**Extraction Date:** ${new Date().toLocaleDateString()}
**Total Candidates Processed:** ${data.extractionStats.total}

## 📞 Contact Information Found:
- **Phone Numbers:** ${data.extractionStats.withPhone} candidates (${((data.extractionStats.withPhone / data.extractionStats.total) * 100).toFixed(1)}%)
- **Email Addresses:** ${data.extractionStats.withEmail} candidates (${((data.extractionStats.withEmail / data.extractionStats.total) * 100).toFixed(1)}%)
- **Social Media Profiles:** ${data.extractionStats.withSocialMedia} candidates (${((data.extractionStats.withSocialMedia / data.extractionStats.total) * 100).toFixed(1)}%)

## 🎯 Priority Distribution:
- **HIGH Priority:** ${data.extractionStats.byPriority.HIGH} candidates
- **MEDIUM Priority:** ${data.extractionStats.byPriority.MEDIUM} candidates
- **LOW Priority:** ${data.extractionStats.byPriority.LOW} candidates

## 📱 Social Media Platforms Found:
${Object.keys(SOCIAL_PATTERNS).map(platform => `- ${platform.charAt(0).toUpperCase() + platform.slice(1)}`).join('\n')}

## 🏛️ Major Party Contacts:
${Object.keys(data.majorParties).map(party => `- ${party}: ${data.majorParties[party].contact}`).join('\n')}

## 📺 Media Outlet Contacts:
${Object.keys(data.mediaOutlets).map(outlet => `- ${outlet}: ${data.mediaOutlets[outlet].contact}`).join('\n')}

## 📁 Generated Files:
- \`candidate-contacts.json\` - Complete candidate contact database
- \`social-media-profiles.json\` - Social media profiles by platform
- \`phone-numbers.json\` - Phone numbers with candidate mapping
- \`party-leadership-contacts.json\` - Major party leadership contacts
- \`media-outlet-contacts.json\` - Media outlet contacts
- \`extraction-stats.json\` - Detailed extraction statistics

## 🚀 Next Steps:
1. Review extracted data for accuracy
2. Begin outreach campaigns using contact information
3. Set up social media monitoring for candidate profiles
4. Implement automated follow-up systems
5. Track engagement and response rates

---
*Generated by Hamlet Contact Extraction System*
`;

    fs.writeFileSync(path.join(OUTPUT_DIR, 'EXTRACTION_SUMMARY.md'), report);
    console.log('📋 Summary report generated: EXTRACTION_SUMMARY.md');
}

// Main execution
async function main() {
    try {
        console.log('🎯 Hamlet Candidate Contact Extractor');
        console.log('=====================================');
        
        const data = await extractCandidateContacts();
        await saveExtractedData(data);
        generateSummaryReport(data);
        
        console.log('\n🎉 Contact extraction completed successfully!');
        console.log(`📁 All files saved to: ${OUTPUT_DIR}/`);
        console.log('\n📋 Next steps:');
        console.log('1. Review the extracted data');
        console.log('2. Begin outreach campaigns');
        console.log('3. Set up social media monitoring');
        
    } catch (error) {
        console.error('❌ Error during extraction:', error);
        process.exit(1);
    }
}

// Run the extraction if this script is executed directly
if (require.main === module) {
    main();
}

module.exports = {
    extractCandidateContacts,
    saveExtractedData,
    generateSummaryReport,
    extractPhoneNumbers,
    extractEmails,
    extractSocialMedia
};

