-- Create admin profile first
INSERT INTO public.profiles (user_id, username, role)
SELECT 
  gen_random_uuid(),
  'admin',
  'admin'
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE username = 'admin' AND role = 'admin'
);

-- Note: The admin user will need to be created through Supabase Auth signup
-- The login form already handles username -> email mapping for 'admin' -> 'admin@alpifyglobal.com'