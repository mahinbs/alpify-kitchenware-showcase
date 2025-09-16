-- Temporarily disable the auth trigger to test login
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Check if there are any constraints causing issues
SELECT conname, contype, pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conrelid = 'auth.users'::regclass;

-- Check for any other triggers on auth.users
SELECT trigger_name, event_manipulation 
FROM information_schema.triggers 
WHERE event_object_table = 'users' AND event_object_schema = 'auth';