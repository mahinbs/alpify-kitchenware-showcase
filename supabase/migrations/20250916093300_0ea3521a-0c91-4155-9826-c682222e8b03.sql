-- Clean up duplicate profiles and fix constraints
DO $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Find the admin user ID from auth.users
    SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@alpify.com';
    
    -- Clean up duplicate profiles - keep only the admin one
    DELETE FROM public.profiles 
    WHERE user_id = admin_user_id AND role != 'admin';
    
    -- Update the remaining admin profile to have correct username
    UPDATE public.profiles 
    SET username = 'admin', role = 'admin'
    WHERE user_id = admin_user_id;
    
    -- Add unique constraint on user_id if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'profiles_user_id_unique' 
        AND table_name = 'profiles'
    ) THEN
        ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_unique UNIQUE (user_id);
    END IF;
    
    RAISE NOTICE 'Admin profile cleaned up for user_id: %', admin_user_id;
END $$;