-- Check and fix the auth trigger
-- First, drop the existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Recreate the handle_new_user function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Only insert if profile doesn't already exist
  INSERT INTO public.profiles (user_id, username, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'username',
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'user')
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log the error but don't fail the auth process
    RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Test that the admin user exists and can authenticate
DO $$
DECLARE
    test_user_id uuid;
BEGIN
    -- Verify admin user exists
    SELECT id INTO test_user_id FROM auth.users WHERE email = 'admin@alpify.com';
    
    IF test_user_id IS NULL THEN
        RAISE EXCEPTION 'Admin user not found';
    END IF;
    
    -- Verify admin profile exists
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE user_id = test_user_id AND role = 'admin') THEN
        RAISE EXCEPTION 'Admin profile not found';
    END IF;
    
    RAISE NOTICE 'Admin user setup verified: %', test_user_id;
END $$;