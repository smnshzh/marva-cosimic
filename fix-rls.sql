-- Fix RLS for categories table
-- Option 1: Disable RLS completely (for testing)
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;

-- Option 2: Enable RLS with proper policies (recommended for production)
-- ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
-- CREATE POLICY "Allow all operations for authenticated users" ON categories
--   FOR ALL USING (auth.role() = 'authenticated');

-- Create policy to allow read access for everyone
-- CREATE POLICY "Allow read access for everyone" ON categories
--   FOR SELECT USING (true);

-- Create policy to allow insert/update/delete for authenticated users
-- CREATE POLICY "Allow authenticated users to manage categories" ON categories
--   FOR ALL USING (auth.role() = 'authenticated');
