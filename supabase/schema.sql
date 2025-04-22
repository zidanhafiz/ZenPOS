-- Schema for ZenPOS database
-- This file creates all necessary tables and relationships

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT,
  photo_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE
);

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  stock INTEGER,
  category TEXT NOT NULL,
  image_url TEXT,
  user_id UUID REFERENCES public.users(id)
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES public.users(id),
  total_price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL,
  payment_status TEXT NOT NULL,
  payment_method TEXT,
  total_payment NUMERIC NOT NULL,
  buyer_name TEXT,
  is_delivered BOOLEAN DEFAULT FALSE
);

-- Create transaction_items table
CREATE TABLE IF NOT EXISTS public.transaction_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID REFERENCES public.transactions(id),
  product_name TEXT,
  price NUMERIC,
  quantity INTEGER,
  total_price NUMERIC
);

-- Create view for distinct categories
CREATE OR REPLACE VIEW public.distinct_category AS
SELECT DISTINCT category FROM public.products;

-- Create RLS (Row Level Security) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transaction_items ENABLE ROW LEVEL SECURITY;

-- Create basic policies (adjust as needed for your app's security model)
CREATE POLICY "Allow authenticated users to view products" 
  ON public.products FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to view transactions" 
  ON public.transactions FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to view transaction items" 
  ON public.transaction_items FOR SELECT 
  USING (auth.role() = 'authenticated'); 