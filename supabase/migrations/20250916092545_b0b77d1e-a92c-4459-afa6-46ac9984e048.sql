-- Create admin user using Supabase's auth functions
-- This will create both the auth user and trigger the profile creation

DO $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Check if admin user already exists
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = 'admin@alpify.com';
    
    -- If admin doesn't exist, create it
    IF admin_user_id IS NULL THEN
        -- Insert into auth.users (this is the proper way to create users)
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            recovery_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
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
            'admin@alpify.com',
            crypt('alpify2024', gen_salt('bf')),
            NOW(),
            NOW(),
            NOW(),
            '{"provider":"email","providers":["email"]}',
            '{"username":"admin","role":"admin"}',
            NOW(),
            NOW(),
            '',
            '',
            '',
            ''
        ) RETURNING id INTO admin_user_id;
        
        -- Insert admin profile (this should be handled by trigger, but let's ensure it)
        INSERT INTO public.profiles (user_id, username, role)
        VALUES (admin_user_id, 'admin', 'admin')
        ON CONFLICT (user_id) DO UPDATE SET
            username = EXCLUDED.username,
            role = EXCLUDED.role;
    ELSE
        -- If user exists, just update the profile
        UPDATE public.profiles 
        SET username = 'admin', role = 'admin'
        WHERE user_id = admin_user_id;
        
        -- If profile doesn't exist for some reason, create it
        INSERT INTO public.profiles (user_id, username, role)
        VALUES (admin_user_id, 'admin', 'admin')
        ON CONFLICT (user_id) DO NOTHING;
    END IF;
END $$;