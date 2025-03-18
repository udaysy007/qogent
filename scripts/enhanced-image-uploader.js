require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Configuration
const config = {
  buckets: {
    public: 'public',
  },
  folders: {
    universities: 'universities',
    countries: 'countries',
  },
  imageTypes: {
    logo: {
      maxWidth: 400,
      maxHeight: 400,
      quality: 90,
      folder: 'logos',
    },
    campus: {
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 85,
      folder: 'campus',
    },
    thumbnail: {
      maxWidth: 400,
      maxHeight: 300,
      quality: 80,
      folder: 'thumbnails',
    },
    flag: {
      maxWidth: 256,
      maxHeight: 256,
      quality: 90,
      folder: 'flags',
    },
    hero: {
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 85,
      folder: 'heroes',
    },
  },
};

/**
 * Process and optimize an image
 */
async function processImage(filePath, options) {
  const { maxWidth, maxHeight, quality } = options;
  const fileExt = path.extname(filePath).toLowerCase();
  
  // Skip processing for SVGs
  if (fileExt === '.svg') {
    return fs.readFileSync(filePath);
  }
  
  try {
    let processor = sharp(filePath).resize({
      width: maxWidth,
      height: maxHeight,
      fit: 'inside',
      withoutEnlargement: true,
    });
    
    // Convert to WebP if not SVG (better compression)
    if (fileExt !== '.svg') {
      if (options.format === 'webp') {
        processor = processor.webp({ quality });
      } else if (fileExt === '.png') {
        processor = processor.png({ quality });
      } else {
        processor = processor.jpeg({ quality, progressive: true });
      }
    }
    
    return await processor.toBuffer();
  } catch (error) {
    console.error(`Error processing image ${filePath}:`, error);
    // Return original file if processing fails
    return fs.readFileSync(filePath);
  }
}

/**
 * Upload a file to Supabase Storage
 */
async function uploadToStorage(buffer, fileName, folder, contentType) {
  const fullPath = `${folder}/${fileName}`;
  console.log(`Uploading ${fullPath}...`);
  
  try {
    const { data, error } = await supabase.storage
      .from(config.buckets.public)
      .upload(fullPath, buffer, {
        contentType,
        upsert: true,
        cacheControl: '3600',
      });
      
    if (error) {
      console.error(`Error uploading ${fullPath}:`, error);
      return null;
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(config.buckets.public)
      .getPublicUrl(fullPath);
      
    console.log(`Successfully uploaded ${fullPath}`);
    
    // Verify the image is accessible
    try {
      const response = await fetch(publicUrl, { method: 'HEAD' });
      if (!response.ok) {
        console.warn(`Warning: Uploaded image ${publicUrl} returned status ${response.status}`);
      }
    } catch (verifyError) {
      console.warn(`Warning: Could not verify accessibility of ${publicUrl}`, verifyError);
    }
    
    return publicUrl;
  } catch (error) {
    console.error(`Unexpected error uploading ${fullPath}:`, error);
    return null;
  }
}

/**
 * Upload university logos
 */
async function uploadUniversityLogos(sourceDir) {
  const logos = [];
  const targetFolder = `${config.folders.universities}/${config.imageTypes.logo.folder}`;
  
  if (!fs.existsSync(sourceDir)) {
    console.warn(`Warning: Directory ${sourceDir} does not exist. Skipping logo uploads.`);
    return logos;
  }
  
  const files = fs.readdirSync(sourceDir)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.svg', '.png', '.jpg', '.jpeg'].includes(ext);
    });
    
  console.log(`Found ${files.length} logos to upload in ${sourceDir}`);
  
  for (const file of files) {
    const filePath = path.join(sourceDir, file);
    const ext = path.extname(file).toLowerCase();
    const slug = file.replace(/-logo\.(svg|png|jpg|jpeg)$/, '').replace(/\.(svg|png|jpg|jpeg)$/, '');
    const newFileName = `${slug}-logo${ext}`;
    
    // Get content type
    const contentType = ext === '.svg' 
      ? 'image/svg+xml' 
      : ext === '.png' 
        ? 'image/png' 
        : 'image/jpeg';
        
    // Process image
    const buffer = await processImage(filePath, config.imageTypes.logo);
    
    // Upload to Supabase
    const publicUrl = await uploadToStorage(buffer, newFileName, targetFolder, contentType);
    
    if (publicUrl) {
      logos.push({
        slug,
        fileName: newFileName,
        publicUrl,
        contentType,
      });
    }
  }
  
  console.log(`Successfully uploaded ${logos.length} university logos`);
  return logos;
}

/**
 * Upload university campus images
 */
async function uploadUniversityCampusImages(sourceDir) {
  const campusImages = [];
  const targetFolder = `${config.folders.universities}/${config.imageTypes.campus.folder}`;
  
  if (!fs.existsSync(sourceDir)) {
    console.warn(`Warning: Directory ${sourceDir} does not exist. Skipping campus image uploads.`);
    return campusImages;
  }
  
  const files = fs.readdirSync(sourceDir)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png'].includes(ext) && file.includes('-campus');
    });
    
  console.log(`Found ${files.length} campus images to upload in ${sourceDir}`);
  
  for (const file of files) {
    const filePath = path.join(sourceDir, file);
    const ext = path.extname(file).toLowerCase();
    const slug = file.replace(/-campus\.(jpg|jpeg|png)$/, '');
    const newFileName = `${slug}-campus.jpg`; // Convert all to jpg for consistency
    
    // Process image
    const buffer = await processImage(filePath, config.imageTypes.campus);
    
    // Upload to Supabase
    const publicUrl = await uploadToStorage(buffer, newFileName, targetFolder, 'image/jpeg');
    
    if (publicUrl) {
      campusImages.push({
        slug,
        fileName: newFileName,
        publicUrl,
      });
    }
  }
  
  console.log(`Successfully uploaded ${campusImages.length} university campus images`);
  return campusImages;
}

/**
 * Upload country flags
 */
async function uploadCountryFlags(sourceDir) {
  const flags = [];
  const targetFolder = `${config.folders.countries}/${config.imageTypes.flag.folder}`;
  
  if (!fs.existsSync(sourceDir)) {
    console.warn(`Warning: Directory ${sourceDir} does not exist. Skipping flag uploads.`);
    return flags;
  }
  
  const files = fs.readdirSync(sourceDir)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.svg', '.png'].includes(ext);
    });
    
  console.log(`Found ${files.length} country flags to upload in ${sourceDir}`);
  
  for (const file of files) {
    const filePath = path.join(sourceDir, file);
    const ext = path.extname(file).toLowerCase();
    const countryCode = file.replace(/\.(svg|png)$/, '').toLowerCase();
    const newFileName = `${countryCode}${ext}`;
    
    // Get content type
    const contentType = ext === '.svg' ? 'image/svg+xml' : 'image/png';
    
    // Process image
    const buffer = await processImage(filePath, config.imageTypes.flag);
    
    // Upload to Supabase
    const publicUrl = await uploadToStorage(buffer, newFileName, targetFolder, contentType);
    
    if (publicUrl) {
      flags.push({
        countryCode,
        fileName: newFileName,
        publicUrl,
      });
    }
  }
  
  console.log(`Successfully uploaded ${flags.length} country flags`);
  return flags;
}

/**
 * Upload country hero images
 */
async function uploadCountryHeroes(sourceDir) {
  const heroes = [];
  const targetFolder = `${config.folders.countries}/${config.imageTypes.hero.folder}`;
  
  if (!fs.existsSync(sourceDir)) {
    console.warn(`Warning: Directory ${sourceDir} does not exist. Skipping hero uploads.`);
    return heroes;
  }
  
  const files = fs.readdirSync(sourceDir)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png'].includes(ext) && file.includes('-hero');
    });
    
  console.log(`Found ${files.length} country heroes to upload in ${sourceDir}`);
  
  for (const file of files) {
    const filePath = path.join(sourceDir, file);
    const ext = path.extname(file).toLowerCase();
    const countryCode = file.replace(/-hero\.(jpg|jpeg|png)$/, '').toLowerCase();
    const newFileName = `${countryCode}-hero.jpg`; // Convert all to jpg for consistency
    
    // Process image
    const buffer = await processImage(filePath, config.imageTypes.hero);
    
    // Upload to Supabase
    const publicUrl = await uploadToStorage(buffer, newFileName, targetFolder, 'image/jpeg');
    
    if (publicUrl) {
      heroes.push({
        countryCode,
        fileName: newFileName,
        publicUrl,
      });
    }
  }
  
  console.log(`Successfully uploaded ${heroes.length} country hero images`);
  return heroes;
}

/**
 * Update university database records with new image URLs
 */
async function updateUniversityDatabase(logos, campusImages) {
  const logosBySlug = {};
  logos.forEach(logo => {
    logosBySlug[logo.slug] = logo.publicUrl;
  });
  
  const campusImagesBySlug = {};
  campusImages.forEach(image => {
    campusImagesBySlug[image.slug] = image.publicUrl;
  });
  
  // Get all universities
  const { data: universities, error } = await supabase
    .from('universities')
    .select('id, slug, name');
    
  if (error) {
    console.error('Error fetching universities:', error);
    return 0;
  }
  
  let updateCount = 0;
  
  // Update each university with the new image URLs
  for (const university of universities) {
    const { slug } = university;
    const logoUrl = logosBySlug[slug];
    const campusImageUrl = campusImagesBySlug[slug];
    
    if (!logoUrl && !campusImageUrl) {
      console.log(`No images found for ${university.name} (${slug}), skipping update`);
      continue;
    }
    
    const updates = {};
    
    if (logoUrl) {
      updates.logo_url = logoUrl;
    }
    
    if (campusImageUrl) {
      updates.campus_image_url = campusImageUrl;
    }
    
    const { error: updateError } = await supabase
      .from('universities')
      .update(updates)
      .eq('id', university.id);
      
    if (updateError) {
      console.error(`Error updating ${university.name}:`, updateError);
    } else {
      console.log(`Updated ${university.name} with new image URLs`);
      updateCount++;
    }
  }
  
  return updateCount;
}

/**
 * Update country database records with new image URLs
 */
async function updateCountryDatabase(flags, heroes) {
  const flagsByCode = {};
  flags.forEach(flag => {
    flagsByCode[flag.countryCode] = flag.publicUrl;
  });
  
  const heroesByCode = {};
  heroes.forEach(hero => {
    heroesByCode[hero.countryCode] = hero.publicUrl;
  });
  
  // Get all countries
  const { data: countries, error } = await supabase
    .from('countries')
    .select('id, code, name');
    
  if (error) {
    console.error('Error fetching countries:', error);
    return 0;
  }
  
  let updateCount = 0;
  
  // Update each country with the new image URLs
  for (const country of countries) {
    const countryCode = country.code.toLowerCase();
    const flagUrl = flagsByCode[countryCode];
    const heroUrl = heroesByCode[countryCode];
    
    if (!flagUrl && !heroUrl) {
      console.log(`No images found for ${country.name} (${countryCode}), skipping update`);
      continue;
    }
    
    const updates = {};
    
    if (flagUrl) {
      updates.flag_url = flagUrl;
    }
    
    if (heroUrl) {
      updates.hero_image_url = heroUrl;
    }
    
    const { error: updateError } = await supabase
      .from('countries')
      .update(updates)
      .eq('id', country.id);
      
    if (updateError) {
      console.error(`Error updating ${country.name}:`, updateError);
    } else {
      console.log(`Updated ${country.name} with new image URLs`);
      updateCount++;
    }
  }
  
  return updateCount;
}

/**
 * Create folder structure in Supabase Storage
 */
async function createFolderStructure() {
  // Create placeholder file to create folders (required by Supabase)
  const placeholderContent = Buffer.from('');
  
  // Define folders to create
  const folders = [
    `${config.folders.universities}/${config.imageTypes.logo.folder}`,
    `${config.folders.universities}/${config.imageTypes.campus.folder}`,
    `${config.folders.universities}/${config.imageTypes.thumbnail.folder}`,
    `${config.folders.countries}/${config.imageTypes.flag.folder}`,
    `${config.folders.countries}/${config.imageTypes.hero.folder}`,
    `${config.folders.countries}/${config.imageTypes.thumbnail.folder}`,
  ];
  
  console.log('Creating folder structure in Supabase Storage...');
  
  for (const folder of folders) {
    try {
      const filePath = `${folder}/.placeholder`;
      console.log(`Creating folder: ${folder}`);
      
      const { error } = await supabase.storage
        .from(config.buckets.public)
        .upload(filePath, placeholderContent, {
          upsert: true,
        });
        
      if (error && !error.message.includes('already exists')) {
        console.error(`Error creating folder ${folder}:`, error);
      }
    } catch (error) {
      console.error(`Error creating folder structure:`, error);
    }
  }
  
  console.log('Folder structure created');
}

/**
 * Create the bucket if it doesn't exist
 */
async function createBucketIfNeeded() {
  try {
    const { data, error } = await supabase.storage.getBucket(config.buckets.public);
    
    if (error && error.message.includes('not found')) {
      console.log(`Creating bucket: ${config.buckets.public}`);
      const { error: createError } = await supabase.storage.createBucket(config.buckets.public, {
        public: true,
      });
      
      if (createError) {
        console.error(`Error creating bucket:`, createError);
        return false;
      }
      
      console.log(`Bucket ${config.buckets.public} created successfully`);
      return true;
    } else if (error) {
      console.error('Error checking bucket:', error);
      return false;
    }
    
    console.log(`Bucket ${config.buckets.public} already exists`);
    return true;
  } catch (error) {
    console.error('Unexpected error checking/creating bucket:', error);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Starting enhanced image uploader...');
    
    // Check if 'sharp' module is installed
    try {
      require.resolve('sharp');
    } catch (e) {
      console.error('Error: sharp module is not installed. Please run: pnpm add sharp');
      process.exit(1);
    }
    
    // Test connection to Supabase
    const { data, error } = await supabase.from('universities').select('id').limit(1);
    if (error) {
      console.error('Error connecting to Supabase:', error);
      process.exit(1);
    }
    console.log('Successfully connected to Supabase');
    
    // Make sure the public bucket exists
    const bucketExists = await createBucketIfNeeded();
    if (!bucketExists) {
      console.error('Failed to create or verify bucket. Exiting.');
      process.exit(1);
    }
    
    // Create folder structure
    await createFolderStructure();
    
    // Start uploading images
    console.log('Starting image upload process...');
    
    // Upload university logos
    const logos = await uploadUniversityLogos(path.join(__dirname, '../public/images/universities/logos'));
    
    // Upload university campus images
    const campusImages = await uploadUniversityCampusImages(path.join(__dirname, '../public/images/universities'));
    
    // Upload country flags
    const flags = await uploadCountryFlags(path.join(__dirname, '../public/images/countries/flags'));
    
    // Upload country hero images
    const heroes = await uploadCountryHeroes(path.join(__dirname, '../public/images/countries/heroes'));
    
    // Update database records
    console.log('Updating database records...');
    
    // Update university records
    const universityUpdates = await updateUniversityDatabase(logos, campusImages);
    console.log(`Updated ${universityUpdates} university records`);
    
    // Update country records
    const countryUpdates = await updateCountryDatabase(flags, heroes);
    console.log(`Updated ${countryUpdates} country records`);
    
    console.log('Image upload and database update process complete!');
    
    // Generate summary report
    console.log('\n=== Upload Summary ===');
    console.log(`University Logos: ${logos.length} uploaded`);
    console.log(`University Campus Images: ${campusImages.length} uploaded`);
    console.log(`Country Flags: ${flags.length} uploaded`);
    console.log(`Country Heroes: ${heroes.length} uploaded`);
    console.log(`University Database Updates: ${universityUpdates}`);
    console.log(`Country Database Updates: ${countryUpdates}`);
    console.log('=====================\n');
    
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

main(); 