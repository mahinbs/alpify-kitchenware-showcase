-- Delete all existing admin users and profiles
DELETE FROM public.profiles WHERE role = 'admin';
DELETE FROM auth.users WHERE email = 'admin@alpifyglobal.com' OR raw_user_meta_data ->> 'username' = 'admin';

-- Create admin user with email confirmed
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  role
) VALUES (
  gen_random_uuid(),
  'admin@alpifyglobal.com',
  crypt('alpify2024', gen_salt('bf')),
  now(),
  jsonb_build_object('username', 'admin', 'role', 'admin'),
  now(),
  now(),
  'authenticated'
);

-- Create admin profile
INSERT INTO public.profiles (user_id, username, role)
SELECT 
  u.id,
  'admin',
  'admin'
FROM auth.users u
WHERE u.email = 'admin@alpifyglobal.com';