-- Delete existing admin user and recreate with proper password
DELETE FROM auth.users WHERE email = 'admin@alpifyglobal.com';

-- Insert admin user with proper authentication
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  raw_app_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@alpifyglobal.com',
  crypt('alpify2024', gen_salt('bf')),
  now(),
  '{"username": "admin"}',
  '{"provider": "email", "providers": ["email"]}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Insert admin profile
INSERT INTO profiles (user_id, username, role)
SELECT id, 'admin', 'admin'
FROM auth.users 
WHERE email = 'admin@alpifyglobal.com';