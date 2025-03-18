#!/usr/bin/env node
/**
 * Image Manager for Qogent.in
 * 
 * A unified script to manage all image-related operations:
 * - Optimize large images (directly replaces originals but creates backups)
 * - Upload images to Supabase
 * - Handle image fallbacks
 * 
 * Usage:
 *   node image-manager.js optimize    # Optimize large image files
 *   node image-manager.js upload      # Upload images to Supabase
 *   node image-manager.js all         # Both optimize and upload
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Supabase setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Directories
const DESTINATIONS_DIR = path.join(process.cwd(), 'public/images/destinations');
const UNIVERSITIES_DIR = path.join(process.cwd(), 'public/images/universities');
const COUNTRIES_DIR = path.join(process.cwd(), 'public/images/countries');
const TEMP_DIR = path.join(process.cwd(), 'public/images/temp');
const BACKUP_DIR = path.join(process.cwd(), 'public/images/backup');

// Ensure directories exist
function ensureDirectoriesExist() {
  [TEMP_DIR, BACKUP_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// ======== IMAGE OPTIMIZATION ========

/**
 * Optimizes large image files and directly replaces originals (with backups)
 * @param {string} directory - Directory containing images to optimize
 * @param {string} pattern - File pattern to match (e.g., '*.jpg')
 * @param {Object} options - Optimization options
 */
async function optimizeImages(directory, pattern = '*.jpg', options = {}) {
  const defaultOptions = {
    width: 1200,
    quality: 80,
    backup: true
  };
  
  const config = { ...defaultOptions, ...options };
  console.log(`\n🖼️  Optimizing images in ${directory}...`);
  console.log(`NOTE: This will directly replace original images after creating backups.`);

  // Get all image files
  const files = fs.readdirSync(directory).filter(file => {
    if (pattern === '*.jpg') return file.endsWith('.jpg');
    if (pattern === '*.png') return file.endsWith('.png');
    if (pattern === '*') return file.endsWith('.jpg') || file.endsWith('.png');
    return true;
  });

  console.log(`Found ${files.length} images to optimize...`);
  
  // Create backup directory if needed
  const backupDir = path.join(BACKUP_DIR, path.basename(directory));
  if (config.backup && !fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  for (const file of files) {
    const filePath = path.join(directory, file);
    const tempPath = path.join(TEMP_DIR, file);
    const backupPath = path.join(backupDir, file);
    
    // Skip if file is too small (likely already optimized)
    const stats = fs.statSync(filePath);
    const fileSizeMB = stats.size / (1024 * 1024);
    
    console.log(`Processing ${file} (${fileSizeMB.toFixed(2)} MB)...`);
    
    // Skip files smaller than 200KB
    if (fileSizeMB < 0.2) {
      console.log(`✅ ${file} is already small (${fileSizeMB.toFixed(2)} MB), skipping`);
      continue;
    }
    
    try {
      // Backup original if requested
      if (config.backup) {
        fs.copyFileSync(filePath, backupPath);
      }
      
      // Process with Sharp
      const sharpInstance = sharp(filePath);
      
      // Get image info
      const metadata = await sharpInstance.metadata();
      
      // Apply optimizations
      let processedImage = sharpInstance.resize({ 
        width: config.width,
        height: metadata.height > metadata.width * 2 ? config.width / 2 : null, // Maintain aspect ratio
        withoutEnlargement: true 
      });
      
      // Apply format-specific optimizations
      if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        processedImage = processedImage.jpeg({ 
          quality: config.quality,
          progressive: true
        });
      } else if (file.endsWith('.png')) {
        processedImage = processedImage.png({ 
          quality: config.quality,
          compressionLevel: 9,
          palette: true
        });
      }
      
      // Save to temp location
      await processedImage.toFile(tempPath);
      
      // Get optimized file size
      const newStats = fs.statSync(tempPath);
      const newSizeMB = newStats.size / (1024 * 1024);
      const savings = (1 - (newStats.size / stats.size)) * 100;
      
      // Replace original with optimized version
      fs.copyFileSync(tempPath, filePath);
      fs.unlinkSync(tempPath); // Remove temp file
      
      console.log(`✅ ${file}: ${fileSizeMB.toFixed(2)} MB → ${newSizeMB.toFixed(2)} MB (${savings.toFixed(1)}% reduction)`);
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\n🎉 Optimization complete for ${directory}!`);
  if (config.backup) {
    console.log(`Original files backed up to: ${backupDir}`);
  }
}

// ======== SUPABASE UPLOAD ========

/**
 * Uploads images to Supabase Storage
 * @param {string} sourceDir - Source directory containing images
 * @param {string} bucketName - Supabase bucket name
 * @param {string} folderName - Folder name within the bucket
 */
async function uploadToSupabase(sourceDir, bucketName, folderName) {
  console.log(`\n☁️  Uploading images from ${sourceDir} to ${bucketName}/${folderName}...`);
  
  // Ensure bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets.some(bucket => bucket.name === bucketName);
  
  if (!bucketExists) {
    console.log(`Creating bucket: ${bucketName}`);
    await supabase.storage.createBucket(bucketName, {
      public: true
    });
  }
  
  // Get files to upload
  const files = fs.readdirSync(sourceDir).filter(file => 
    !file.startsWith('.') && (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.svg'))
  );
  
  console.log(`Found ${files.length} files to upload...`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const file of files) {
    const filePath = path.join(sourceDir, file);
    const fileContent = fs.readFileSync(filePath);
    const storagePath = folderName ? `${folderName}/${file}` : file;
    
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(storagePath, fileContent, {
          contentType: file.endsWith('.svg') ? 'image/svg+xml' : 
                      file.endsWith('.png') ? 'image/png' : 'image/jpeg',
          upsert: true
        });
      
      if (error) {
        throw error;
      }
      
      const { data: publicUrl } = supabase.storage.from(bucketName).getPublicUrl(storagePath);
      console.log(`✅ Uploaded ${file} → ${publicUrl.publicUrl}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error uploading ${file}:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\n🎉 Upload complete! Successfully uploaded ${successCount} files with ${errorCount} errors.`);
}

// ======== MAIN FUNCTION ========

async function main() {
  const command = process.argv[2] || 'help';
  
  ensureDirectoriesExist();
  
  switch(command) {
    case 'optimize':
      // Optimize destination images
      await optimizeImages(DESTINATIONS_DIR, '*.jpg', { width: 1200, quality: 80 });
      break;
      
    case 'upload':
      // Upload destination images to Supabase
      await uploadToSupabase(
        path.join(DESTINATIONS_DIR), 
        'countries', 
        'hero'
      );
      
      // Upload university campus images
      await uploadToSupabase(
        path.join(UNIVERSITIES_DIR, 'campus'), 
        'universities',
        'campus'
      );
      
      // Upload university logos
      await uploadToSupabase(
        path.join(UNIVERSITIES_DIR, 'logos'), 
        'universities',
        'logos'
      );
      
      // Upload country flags
      await uploadToSupabase(
        path.join(COUNTRIES_DIR, 'flags'), 
        'countries',
        'flags'
      );
      break;
      
    case 'all':
      // Optimize then upload
      await optimizeImages(DESTINATIONS_DIR, '*.jpg', { width: 1200, quality: 80 });
      
      await uploadToSupabase(
        path.join(DESTINATIONS_DIR), 
        'countries', 
        'hero'
      );
      
      await uploadToSupabase(
        path.join(UNIVERSITIES_DIR, 'campus'), 
        'universities',
        'campus'
      );
      
      await uploadToSupabase(
        path.join(UNIVERSITIES_DIR, 'logos'), 
        'universities',
        'logos'
      );
      
      await uploadToSupabase(
        path.join(COUNTRIES_DIR, 'flags'), 
        'countries',
        'flags'
      );
      break;
      
    case 'help':
    default:
      console.log(`
Qogent Image Manager

Usage:
  node image-manager.js <command>

Commands:
  optimize     Optimize large image files (replaces originals but creates backups)
  upload       Upload images to Supabase Storage
  all          Both optimize and upload
  help         Show this help message

Examples:
  node image-manager.js optimize   # Optimize destination images
  node image-manager.js upload     # Upload images to Supabase
  node image-manager.js all        # Optimize and upload
      `);
      break;
  }
}

// Execute main function
main().catch(console.error); 