-- Check what's blocking the username 'admin' and clean up if needed
DO $$
DECLARE
    admin_user_id uuid;
    existing_admin_profile record;
BEGIN
    -- Check for any existing admin profiles
    SELECT * INTO existing_admin_profile FROM public.profiles WHERE username = 'admin';
    
    -- If there's an existing admin profile with invalid user_id, clean it up
    IF existing_admin_profile.user_id = '00000000-0000-0000-0000-000000000000' THEN
        DELETE FROM public.profiles WHERE user_id = '00000000-0000-0000-0000-000000000000';
    END IF;
    
    -- Now create the proper admin user
    -- First check if auth user exists
    SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@alpify.com';
    
    IF admin_user_id IS NULL THEN
        -- Create auth user with proper password hash
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            'admin@alpify.com',
            crypt('alpify2024', gen_salt('bf')),
            NOW(),
            '{"provider":"email","providers":["email"]}',
            '{"username":"admin","role":"admin"}',
            NOW(),
            NOW()
        ) RETURNING id INTO admin_user_id;
    END IF;
    
    -- Create or update the profile
    INSERT INTO public.profiles (user_id, username, role)
    VALUES (admin_user_id, 'admin', 'admin')
    ON CONFLICT (user_id) DO UPDATE SET
        username = 'admin',
        role = 'admin';
        
END $$;