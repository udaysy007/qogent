const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = path.join(process.cwd(), 'public/images/destinations');
const targetDir = path.join(process.cwd(), 'public/images/destinations-optimized');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Get all jpg files in the sourceDir
const imageFiles = fs.readdirSync(sourceDir).filter(file => file.endsWith('.jpg'));

// Process each image
async function optimizeImages() {
  console.log(`Found ${imageFiles.length} images to optimize...`);
  
  for (const file of imageFiles) {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    // Get original file size
    const stats = fs.statSync(sourcePath);
    const originalSize = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`Processing ${file} (${originalSize} MB)...`);
    
    try {
      // Optimize image: resize to max width 1200px, quality 80%
      await sharp(sourcePath)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true })
        .toFile(targetPath);
      
      // Get new file size
      const newStats = fs.statSync(targetPath);
      const newSize = (newStats.size / (1024 * 1024)).toFixed(2);
      
      const savings = (1 - (newStats.size / stats.size)) * 100;
      console.log(`✅ ${file}: ${originalSize} MB → ${newSize} MB (${savings.toFixed(1)}% reduction)`);
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
}

async function moveOptimizedFiles() {
  console.log('\nMoving optimized files to replace originals...');
  
  // Create a backup directory
  const backupDir = path.join(process.cwd(), 'public/images/destinations-backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  for (const file of imageFiles) {
    const originalPath = path.join(sourceDir, file);
    const optimizedPath = path.join(targetDir, file);
    const backupPath = path.join(backupDir, file);
    
    if (fs.existsSync(optimizedPath)) {
      // Backup original first
      fs.copyFileSync(originalPath, backupPath);
      
      // Replace original with optimized
      fs.copyFileSync(optimizedPath, originalPath);
      console.log(`✅ Replaced ${file} with optimized version (original backed up)`);
    }
  }
  
  console.log('\nImage optimization complete!');
  console.log(`Original images backed up to: ${backupDir}`);
}

// Run the optimization
optimizeImages().then(moveOptimizedFiles).catch(console.error); 