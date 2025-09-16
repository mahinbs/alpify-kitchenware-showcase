-- Update admin user in auth.users table
UPDATE auth.users 
SET 
  email = 'admin@alpifyglobal.com',
  raw_user_meta_data = jsonb_build_object('username', 'admin', 'role', 'admin'),
  email_confirmed_at = now(),
  confirmed_at = now()
WHERE email = 'admin@alpify.com' OR raw_user_meta_data ->> 'username' = 'admin';

-- Update admin profile in profiles table
UPDATE public.profiles 
SET 
  username = 'admin',
  role = 'admin'
WHERE role = 'admin' OR username = 'admin';

-- If no admin exists, create one
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at
) 
SELECT 
  gen_random_uuid(),
  'admin@alpifyglobal.com',
  crypt('alpify2024', gen_salt('bf')),
  now(),
  now(),
  jsonb_build_object('username', 'admin', 'role', 'admin'),
  now(),
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'admin@alpifyglobal.com'
);

-- Ensure admin profile exists
INSERT INTO public.profiles (user_id, username, role)
SELECT 
  u.id,
  'admin',
  'admin'
FROM auth.users u
WHERE u.email = 'admin@alpifyglobal.com'
AND NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.user_id = u.id
);