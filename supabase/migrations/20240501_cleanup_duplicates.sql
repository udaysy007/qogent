-- Delete duplicate programs
WITH duplicate_programs AS (
  SELECT id, university_id, name, degree_level,
         ROW_NUMBER() OVER (PARTITION BY university_id, name, degree_level ORDER BY id) as row_num
  FROM programs
)
DELETE FROM programs
WHERE id IN (
  SELECT id FROM duplicate_programs WHERE row_num > 1
); 