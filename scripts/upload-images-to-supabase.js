require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY; // Use service key for admin actions
console.log(`Using Supabase URL: ${supabaseUrl}`);
console.log(`Using Service Key: ${supabaseKey ? `${supabaseKey.substring(0, 5)}...${supabaseKey.substring(supabaseKey.length - 5)}` : 'not set'}`);

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase credentials not found in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Simple test to check if the client is working
async function testConnection() {
  try {
    const { data, error } = await supabase.from('universities').select('id').limit(1);
    if (error) {
      console.error('Error connecting to Supabase:', error);
      process.exit(1);
    }
    console.log('Successfully connected to Supabase');
  } catch (error) {
    console.error('Error testing connection:', error);
    process.exit(1);
  }
}

async function main() {
  try {
    await testConnection();
    
    console.log('Starting upload process to Supabase Storage...');
    console.log('Using bucket: universities (assuming it already exists)');
    
    // Upload campus images
    console.log('Uploading campus images...');
    const campusImagesDir = path.join(__dirname, '../public/images/universities');
    const campusImages = fs.readdirSync(campusImagesDir)
      .filter(file => file.includes('-campus.jpg'));
    
    let campusUploadCount = 0;
    for (const image of campusImages) {
      const filePath = path.join(campusImagesDir, image);
      const fileBuffer = fs.readFileSync(filePath);
      const slug = image.replace('-campus.jpg', '');
      
      console.log(`Attempting to upload ${image}...`);
      const { data, error } = await supabase.storage
        .from('universities')
        .upload(`campus/${slug}.jpg`, fileBuffer, {
          contentType: 'image/jpeg',
          upsert: true,
          cacheControl: '3600'
        });
      
      if (error) {
        console.error(`Error uploading ${image}:`, error);
      } else {
        campusUploadCount++;
        console.log(`Uploaded ${image} to Supabase Storage`);
      }
    }
    
    console.log(`Successfully uploaded ${campusUploadCount} university campus images to Supabase Storage`);

    // Upload logo images
    console.log('Uploading logo images...');
    const logosDir = path.join(__dirname, '../public/images/universities/logos');
    
    // Check if the directory exists
    if (fs.existsSync(logosDir)) {
      const logoImages = fs.readdirSync(logosDir)
        .filter(file => file.endsWith('.svg') || file.endsWith('.png') || file.endsWith('.jpg'));
      
      let logoUploadCount = 0;
      for (const logo of logoImages) {
        const filePath = path.join(logosDir, logo);
        const fileBuffer = fs.readFileSync(filePath);
        const contentType = logo.endsWith('.svg') 
          ? 'image/svg+xml' 
          : logo.endsWith('.png') 
            ? 'image/png' 
            : 'image/jpeg';
        
        console.log(`Attempting to upload ${logo}...`);
        const { data, error } = await supabase.storage
          .from('universities')
          .upload(`logos/${logo}`, fileBuffer, {
            contentType,
            upsert: true,
            cacheControl: '3600'
          });
        
        if (error) {
          console.error(`Error uploading ${logo}:`, error);
        } else {
          logoUploadCount++;
          console.log(`Uploaded ${logo} to Supabase Storage`);
        }
      }
      
      console.log(`Successfully uploaded ${logoUploadCount} university logos to Supabase Storage`);
    } else {
      console.log('Logos directory does not exist, skipping logo uploads');
    }
    
    // Get the university list from the database
    const { data: universities, error: dbError } = await supabase
      .from('universities')
      .select('id, slug, name');
      
    if (dbError) {
      console.error('Error fetching universities:', dbError);
      return;
    }
    
    // Update the database with the new URLs
    console.log('Updating university image URLs in the database...');
    let updateCount = 0;
    
    for (const university of universities) {
      const { slug } = university;
      
      // Try to find a matching logo file
      let logoFileName = null;
      const possibleLogoNames = [
        `${slug}-logo.svg`,
        `${slug}.svg`,
        `${slug}-logo.png`,
        `${slug}.png`,
        `${slug}-logo.jpg`,
        `${slug}.jpg`
      ];
      
      if (fs.existsSync(logosDir)) {
        for (const logoName of possibleLogoNames) {
          if (fs.existsSync(path.join(logosDir, logoName))) {
            logoFileName = logoName;
            break;
          }
        }
      }
      
      // Default fallbacks for common universities
      const slugAbbreviations = {
        'trinity-college-dublin': 'tcd-logo.svg',
        'university-of-toronto': 'uoft-logo.svg',
        'technical-university-of-munich': 'tum-logo.svg',
        'university-college-dublin': 'ucd-logo.svg'
      };
      
      if (!logoFileName && slugAbbreviations[slug]) {
        logoFileName = slugAbbreviations[slug];
      }
      
      const campusStorageUrl = supabase.storage.from('universities').getPublicUrl(`campus/${slug}.jpg`).data.publicUrl;
      
      // Use the found logo file or a standard placeholder
      const logoStorageUrl = logoFileName 
        ? supabase.storage.from('universities').getPublicUrl(`logos/${logoFileName}`).data.publicUrl
        : supabase.storage.from('universities').getPublicUrl(`logos/${slug}.svg`).data.publicUrl;
      
      const { error: updateError } = await supabase
        .from('universities')
        .update({
          campus_image_url: campusStorageUrl,
          logo_url: logoStorageUrl,
        })
        .eq('id', university.id);
      
      if (updateError) {
        console.error(`Error updating ${university.name}:`, updateError);
      } else {
        updateCount++;
        console.log(`Updated ${university.name} with new image URLs`);
      }
    }
    
    console.log(`Successfully updated ${updateCount} universities in the database`);
    console.log('Migration to Supabase Storage complete!');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

main();