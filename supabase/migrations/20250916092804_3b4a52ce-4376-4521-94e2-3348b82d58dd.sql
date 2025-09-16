-- First, add unique constraint on user_id in profiles table
ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_unique UNIQUE (user_id);

-- Create admin user using Supabase's auth functions
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
        -- Insert into auth.users 
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
            '{"provider":"email","providers":["email"]}',
            '{"username":"admin","role":"admin"}',
            NOW(),
            NOW(),
            '',
            '',
            '',
            ''
        ) RETURNING id INTO admin_user_id;
        
        -- Insert admin profile
        INSERT INTO public.profiles (user_id, username, role)
        VALUES (admin_user_id, 'admin', 'admin');
    ELSE
        -- If user exists, just ensure the profile is correct
        INSERT INTO public.profiles (user_id, username, role)
        VALUES (admin_user_id, 'admin', 'admin')
        ON CONFLICT (user_id) DO UPDATE SET
            username = EXCLUDED.username,
            role = EXCLUDED.role;
    END IF;
END $$;