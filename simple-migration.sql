-- Simple migration for essential tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  discount_percentage INTEGER CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
  stock INTEGER DEFAULT 0,
  category_id UUID REFERENCES categories(id),
  brand TEXT,
  images TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample categories
INSERT INTO categories (name, description) VALUES 
('لوازم آرایش', 'محصولات آرایشی و زیبایی'),
('مراقبت پوست', 'کرم‌ها و محصولات مراقبت از پوست'),
('عطر و ادکلن', 'عطرهای زنانه و مردانه'),
('لوازم مو', 'شامپو، نرم‌کننده و محصولات مو')
ON CONFLICT (name) DO NOTHING;
