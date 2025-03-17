-- Script to insert missing countries before updating them
-- This ensures that all required countries exist in the database

-- Insert Poland if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM countries WHERE slug = 'poland') THEN
    INSERT INTO countries (name, slug, code, region, flag_url, description, featured, tags)
    VALUES (
      'Poland',
      'poland',
      'PL',
      'europe',
      '/images/flags/poland.svg',
      'Affordable tuition fees and living costs combined with high-quality education make Poland an increasingly popular destination for international students.',
      true,
      ARRAY['affordable', 'english-taught']
    );
    RAISE NOTICE 'Poland has been inserted.';
  ELSE
    RAISE NOTICE 'Poland already exists.';
  END IF;
END
$$;

-- Insert Australia if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM countries WHERE slug = 'australia') THEN
    INSERT INTO countries (name, slug, code, region, flag_url, description, featured, tags)
    VALUES (
      'Australia',
      'australia',
      'AU',
      'oceania',
      '/images/flags/australia.svg',
      'With world-class universities and a high quality of life, Australia offers excellent education in a beautiful, diverse environment.',
      true,
      ARRAY['english-taught', 'work-opportunities', 'immigration-pathway']
    );
    RAISE NOTICE 'Australia has been inserted.';
  ELSE
    RAISE NOTICE 'Australia already exists.';
  END IF;
END
$$;

-- Insert USA if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM countries WHERE slug = 'usa') THEN
    INSERT INTO countries (name, slug, code, region, flag_url, description, featured, tags)
    VALUES (
      'United States',
      'usa',
      'US',
      'north-america',
      '/images/flags/usa.svg',
      'Home to many of the world''s top-ranked universities, the USA offers unparalleled research opportunities and campus experiences.',
      true,
      ARRAY['english-taught', 'work-opportunities']
    );
    RAISE NOTICE 'USA has been inserted.';
  ELSE
    RAISE NOTICE 'USA already exists.';
  END IF;
END
$$;

-- Insert Netherlands if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM countries WHERE slug = 'netherlands') THEN
    INSERT INTO countries (name, slug, code, region, flag_url, description, featured, tags)
    VALUES (
      'Netherlands',
      'netherlands',
      'NL',
      'europe',
      '/images/flags/netherlands.svg',
      'With excellent English-taught programs and a high standard of living, the Netherlands offers quality education in an innovative environment.',
      false,
      ARRAY['english-taught', 'work-opportunities']
    );
    RAISE NOTICE 'Netherlands has been inserted.';
  ELSE
    RAISE NOTICE 'Netherlands already exists.';
  END IF;
END
$$;

-- Insert Japan if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM countries WHERE slug = 'japan') THEN
    INSERT INTO countries (name, slug, code, region, flag_url, description, featured, tags)
    VALUES (
      'Japan',
      'japan',
      'JP',
      'asia',
      '/images/flags/japan.svg',
      'Combining traditional culture with cutting-edge technology, Japan offers unique educational experiences and increasing numbers of English programs.',
      false,
      ARRAY['work-opportunities']
    );
    RAISE NOTICE 'Japan has been inserted.';
  ELSE
    RAISE NOTICE 'Japan already exists.';
  END IF;
END
$$;

-- Insert Singapore if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM countries WHERE slug = 'singapore') THEN
    INSERT INTO countries (name, slug, code, region, flag_url, description, featured, tags)
    VALUES (
      'Singapore',
      'singapore',
      'SG',
      'asia',
      '/images/flags/singapore.svg',
      'A global education hub with world-class universities, Singapore offers quality education in a safe, clean, and multicultural environment.',
      false,
      ARRAY['english-taught', 'work-opportunities']
    );
    RAISE NOTICE 'Singapore has been inserted.';
  ELSE
    RAISE NOTICE 'Singapore already exists.';
  END IF;
END
$$;

-- Insert United Kingdom if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM countries WHERE slug = 'uk') THEN
    INSERT INTO countries (name, slug, code, region, flag_url, description, featured, tags)
    VALUES (
      'United Kingdom',
      'uk',
      'GB',
      'europe',
      '/images/flags/uk.svg',
      'Home to some of the world''s oldest and most prestigious universities, the UK offers world-class education with globally recognized qualifications.',
      true,
      ARRAY['english-taught', 'work-opportunities', 'research-excellence']
    );
    RAISE NOTICE 'United Kingdom has been inserted.';
  ELSE
    RAISE NOTICE 'United Kingdom already exists.';
  END IF;
END
$$;

-- Insert France if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM countries WHERE slug = 'france') THEN
    INSERT INTO countries (name, slug, code, region, flag_url, description, featured, tags)
    VALUES (
      'France',
      'france',
      'FR',
      'europe',
      '/images/flags/france.svg',
      'With low tuition fees and a rich cultural heritage, France offers high-quality education in a country renowned for its art, cuisine, and history.',
      true,
      ARRAY['affordable', 'cultural-experience']
    );
    RAISE NOTICE 'France has been inserted.';
  ELSE
    RAISE NOTICE 'France already exists.';
  END IF;
END
$$;

-- Insert Italy if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM countries WHERE slug = 'italy') THEN
    INSERT INTO countries (name, slug, code, region, flag_url, description, featured, tags)
    VALUES (
      'Italy',
      'italy',
      'IT',
      'europe',
      '/images/flags/italy.svg',
      'With ancient universities and a rich cultural heritage, Italy offers quality education with growing numbers of English-taught programs in a country famous for its art, design, and cuisine.',
      false,
      ARRAY['affordable', 'cultural-experience']
    );
    RAISE NOTICE 'Italy has been inserted.';
  ELSE
    RAISE NOTICE 'Italy already exists.';
  END IF;
END
$$; 