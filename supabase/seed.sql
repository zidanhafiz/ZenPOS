-- Delete existing data
TRUNCATE TABLE public.transaction_items CASCADE;
TRUNCATE TABLE public.transactions CASCADE;
TRUNCATE TABLE public.products CASCADE;
TRUNCATE TABLE public.users CASCADE;

-- Insert sample users
-- Note: In a real project, never store real passwords in seed files
-- The password hash below is for 'Admin123!' - NEVER use in production!
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data)
VALUES
  ('0a4cc4d1-14dd-4641-b632-f4bb228e6278', 'admin@example.com', '$2a$10$RFUhQHK5JCyIj7ioFWgR2OMy6SOVqI51rUUiGxeU/u3zL5w.1v5j2', now(), '{"provider":"email","providers":["email"]}', '{"first_name":"Admin","last_name":"User"}');

-- Map auth user to public user
INSERT INTO public.users (id, email, first_name, last_name, is_verified, created_at)
VALUES
  ('0a4cc4d1-14dd-4641-b632-f4bb228e6278', 'admin@example.com', 'Admin', 'User', true, now());

-- Insert products
INSERT INTO public.products (id, name, description, price, stock, category, image_url, user_id)
VALUES
  ('c3da0494-d3a3-490a-bf5a-4cb75f30f95e', 'Minyak Goreng Bimoli 2L', 'Minyak goreng berkualitas tinggi, 2L', 24000, 32, 'Minyak & Mentega', 'https://example.com/images/bimoli.jpg', '0a4cc4d1-14dd-4641-b632-f4bb228e6278'),
  ('923cb0f8-6d5b-4567-bd68-607eda49ae32', 'Dettol Sabun Cair 800ml', 'Sabun cair antibakteri, 800ml', 32000, 20, 'Perlengkapan Mandi', 'https://example.com/images/dettol.jpg', '0a4cc4d1-14dd-4641-b632-f4bb228e6278'),
  ('f01b80ff-a5b5-4b55-a00d-19d5e7d372a1', 'Ultra Milk Full Cream 1L', 'Susu UHT full cream, 1L', 17500, 50, 'Susu & Olahan Susu', 'https://example.com/images/ultramilk.jpg', '0a4cc4d1-14dd-4641-b632-f4bb228e6278'),
  ('a57a0f69-75cb-430c-b195-81c4db04c746', 'Sari Roti Tawar Jumbo', 'Roti tawar Jumbo', 20000, 10, 'Makanan', 'https://example.com/images/sariroti.jpg', '0a4cc4d1-14dd-4641-b632-f4bb228e6278'),
  ('b5ffa703-37fe-4077-b739-660ab7be19a7', 'Teh Kotak 250ml', 'Teh kotak, 250ml', 4000, 100, 'Minuman', 'https://example.com/images/tehkotak.jpg', '0a4cc4d1-14dd-4641-b632-f4bb228e6278'),
  ('d7775e8c-6bd2-4f60-9dca-950907df48a8', 'Pocari Sweat 500ml', 'Minuman isotonik, 500ml', 6000, 48, 'Minuman', 'https://example.com/images/pocarisweat.jpg', '0a4cc4d1-14dd-4641-b632-f4bb228e6278'),
  ('f4993eb6-cf84-43b7-a68b-15ab12fa2a74', 'Japota Honey Butter', 'Japota Honey Butter, 68g', 11000, 100, 'Makanan', 'https://example.com/images/japota.jpg', '0a4cc4d1-14dd-4641-b632-f4bb228e6278');

-- Insert transactions
INSERT INTO public.transactions (id, user_id, total_price, quantity, payment_status, payment_method, total_payment, buyer_name, is_delivered, created_at)
VALUES
  ('ccda9adc-ffba-49f6-973b-651bf436171a', '0a4cc4d1-14dd-4641-b632-f4bb228e6278', 68500, 3, 'COMPLETED', 'CASH', 70000, 'Budi Santoso', true, now() - interval '2 days'),
  ('fe24e05e-7a83-4831-a13c-00ff44e702d8', '0a4cc4d1-14dd-4641-b632-f4bb228e6278', 125000, 5, 'COMPLETED', 'TRANSFER', 125000, 'Siti Rahayu', true, now() - interval '1 day'),
  ('62e8b8f2-c266-4b3f-9ee4-2526e849fed6', '0a4cc4d1-14dd-4641-b632-f4bb228e6278', 45000, 2, 'FAILED', 'CASH', 0, 'Ahmad Hidayat', false, now());

-- Insert transaction items
INSERT INTO public.transaction_items (id, transaction_id, product_name, price, quantity, total_price)
VALUES
  (uuid_generate_v4(), 'ccda9adc-ffba-49f6-973b-651bf436171a', 'Minyak Goreng Bimoli 2L', 24000, 1, 24000),
  (uuid_generate_v4(), 'ccda9adc-ffba-49f6-973b-651bf436171a', 'Ultra Milk Full Cream 1L', 17500, 1, 17500),
  (uuid_generate_v4(), 'ccda9adc-ffba-49f6-973b-651bf436171a', 'Teh Kotak 250ml', 4000, 1, 4000),
  
  (uuid_generate_v4(), 'fe24e05e-7a83-4831-a13c-00ff44e702d8', 'Dettol Sabun Cair 800ml', 32000, 2, 64000),
  (uuid_generate_v4(), 'fe24e05e-7a83-4831-a13c-00ff44e702d8', 'Pocari Sweat 500ml', 6000, 5, 30000),
  (uuid_generate_v4(), 'fe24e05e-7a83-4831-a13c-00ff44e702d8', 'Japota Honey Butter', 11000, 2, 22000),
  (uuid_generate_v4(), 'fe24e05e-7a83-4831-a13c-00ff44e702d8', 'Sari Roti Tawar Jumbo', 20000, 1, 20000),
  
  (uuid_generate_v4(), '62e8b8f2-c266-4b3f-9ee4-2526e849fed6', 'Dettol Sabun Cair 800ml', 32000, 1, 32000),
  (uuid_generate_v4(), '62e8b8f2-c266-4b3f-9ee4-2526e849fed6', 'Japota Honey Butter', 11000, 1, 11000);

-- Create a supabase storage bucket for product images (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;
