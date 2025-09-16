-- Create admin user in auth.users table
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  role
) VALUES (
  gen_random_uuid(),
  'admin@alpifyglobal.com',
  crypt('alpify2024', gen_salt('bf')),
  now(),
  now(),
  jsonb_build_object('username', 'admin', 'role', 'admin'),
  now(),
  now(),
  'authenticated'
) ON CONFLICT (email) DO UPDATE SET
  encrypted_password = crypt('alpify2024', gen_salt('bf')),
  raw_user_meta_data = jsonb_build_object('username', 'admin', 'role', 'admin'),
  updated_at = now();

-- Create admin profile
INSERT INTO public.profiles (user_id, username, role)
SELECT 
  u.id,
  'admin',
  'admin'
FROM auth.users u
WHERE u.email = 'admin@alpifyglobal.com'
ON CONFLICT (user_id) DO UPDATE SET
  username = 'admin',
  role = 'admin';