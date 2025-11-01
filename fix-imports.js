const fs = require('fs');
const path = require('path');

function fixImports(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('dist')) {
        fixImports(filePath);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      const original = content;
      
      // Remove .ts and .tsx extensions from import statements
      content = content.replace(/from\s+['"]([^'"]+)\.ts(['"])/g, "from '$1$2");
      content = content.replace(/from\s+['"]([^'"]+)\.tsx(['"])/g, "from '$1$2");
      
      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed: ${filePath}`);
      }
    }
  }
}

fixImports(process.cwd());
console.log('Done fixing imports!');

