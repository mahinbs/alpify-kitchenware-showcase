-- Insert admin user into auth.users (this will trigger the profile creation)
-- Note: In a real scenario, you would create this user through the Supabase auth system
-- For now, we'll just ensure the admin profile exists

-- Update the profiles table to ensure we have an admin user
DO $$
BEGIN
  -- Check if admin profile exists, if not we'll need the user to create it via signup
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE username = 'admin' AND role = 'admin'
  ) THEN
    -- Insert a placeholder admin profile (user_id will need to be updated with real auth user)
    INSERT INTO public.profiles (user_id, username, role)
    VALUES ('00000000-0000-0000-0000-000000000000', 'admin', 'admin')
    ON CONFLICT (user_id) DO UPDATE SET
      username = EXCLUDED.username,
      role = EXCLUDED.role;
  END IF;
END $$;

-- Note: The actual admin user needs to be created through Supabase Auth
-- This can be done via the Supabase dashboard or by signing up with:
-- Email: admin@alpify.com (or any email)
-- Password: alpify2024
-- Then update the profile to set username = 'admin' and role = 'admin'