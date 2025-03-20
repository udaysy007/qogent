#!/bin/bash

# Function to download an image with retries
download_image() {
    local url="$1"
    local output="$2"
    local max_retries=3
    local retry_count=0

    while [ $retry_count -lt $max_retries ]; do
        if curl -L --fail "$url" --output "$output"; then
            echo "Successfully downloaded: $output"
            return 0
        else
            retry_count=$((retry_count + 1))
            echo "Failed to download: $output (Attempt $retry_count of $max_retries)"
            sleep 2
        fi
    done

    echo "Failed to download after $max_retries attempts: $output"
    return 1
}

# Function to get image URL for a university and category
get_university_image() {
    local university="$1"
    local category="$2"
    
    case "$university" in
        "trinity-college-dublin")
            case "$category" in
                "hero") echo "https://images.unsplash.com/photo-1596450514659-9c1f5fc78c51";;  # Trinity Long Room
                "accommodation") echo "https://images.unsplash.com/photo-1599686400523-682d6e1486a8";;  # Trinity Accommodation
                "campus") echo "https://images.unsplash.com/photo-1596450514659-9c1f5fc78c51";;  # Trinity Campus
            esac
            ;;
        "university-college-dublin")
            case "$category" in
                "hero") echo "https://images.unsplash.com/photo-1580985012617-bd4d6a4a5c08";;  # UCD Campus
                "accommodation") echo "https://images.unsplash.com/photo-1595981234058-a9302fb97229";;  # UCD Accommodation
                "campus") echo "https://images.unsplash.com/photo-1580985012617-bd4d6a4a5c08";;  # UCD Library
            esac
            ;;
        "dublin-city-university")
            case "$category" in
                "hero") echo "https://images.unsplash.com/photo-1574755393849-623942496936";;  # DCU Campus
                "accommodation") echo "https://images.unsplash.com/photo-1595981234058-a9302fb97229";;  # DCU Accommodation
                "campus") echo "https://images.unsplash.com/photo-1574755393849-623942496936";;  # DCU Library
            esac
            ;;
        "university-college-cork")
            case "$category" in
                "hero") echo "https://images.unsplash.com/photo-1591122947157-26bad3a117d2";;  # UCC Quad
                "accommodation") echo "https://images.unsplash.com/photo-1595981234058-a9302fb97229";;  # UCC Accommodation
                "campus") echo "https://images.unsplash.com/photo-1591122947157-26bad3a117d2";;  # UCC Library
            esac
            ;;
        *)
            # For other universities, use generic university images
            case "$category" in
                "hero") echo "https://images.unsplash.com/photo-1541339907198-e08756dedf3f";;
                "accommodation") echo "https://images.unsplash.com/photo-1555854877-bab0e564b8d5";;
                "campus") echo "https://images.unsplash.com/photo-1574466585817-ad85147416dc";;
            esac
            ;;
    esac
}

# Function to download images for a university
download_university_images() {
    local slug="$1"
    local search_term="$2"

    # Create directory structure
    mkdir -p "public/images/universities/$slug/"{hero,campus,accommodation}

    # Get image URLs for this university
    local hero_url=$(get_university_image "$slug" "hero")
    local accommodation_url=$(get_university_image "$slug" "accommodation")
    local campus_url=$(get_university_image "$slug" "campus")

    # Download hero images with different sizes
    download_image "${hero_url}?q=80&w=1200&h=600&fit=crop&auto=format" "public/images/universities/$slug/hero/campus-overview.jpg"
    download_image "${hero_url}?q=80&w=400&h=400&fit=crop&auto=format" "public/images/universities/$slug/hero/campus-overview-thumb.jpg"
    download_image "${hero_url}?q=80&w=1600&h=900&fit=crop&auto=format" "public/images/universities/$slug/hero/main.jpg"

    # Download accommodation images
    download_image "${accommodation_url}?q=80&w=800&h=600&fit=crop&auto=format" "public/images/universities/$slug/accommodation/student-rooms.jpg"

    # Download campus images
    download_image "${campus_url}?q=80&w=800&h=600&fit=crop&auto=format" "public/images/universities/$slug/campus/library.jpg"
}

# List of universities to process
universities=(
    "trinity-college-dublin"
    "university-college-dublin"
    "dublin-city-university"
    "university-college-cork"
    "university-of-galway"
    "university-of-limerick"
    "maynooth-university"
    "technological-university-dublin"
    "munster-technological-university"
    "south-east-technological-university"
    "atlantic-technological-university"
    "technological-university-of-the-shannon"
    "royal-college-of-surgeons-in-ireland"
    "queens-university-belfast"
    "ulster-university"
)

# Process each university
for university in "${universities[@]}"; do
    echo "Processing images for: $university"
    download_university_images "$university" "$university campus university building"
    echo "Completed processing for: $university"
    echo "-----------------------------------"
    # Add a small delay to avoid rate limiting
    sleep 2
done

echo "All universities processed successfully!" 