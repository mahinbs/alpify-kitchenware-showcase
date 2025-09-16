-- Simple approach: Create admin user step by step
DO $$
DECLARE
    admin_user_id uuid := gen_random_uuid();
BEGIN
    -- Create the auth user first
    INSERT INTO auth.users (
        id,
        instance_id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_app_meta_data,
        raw_user_meta_data
    ) VALUES (
        admin_user_id,
        '00000000-0000-0000-0000-000000000000',
        'authenticated',
        'authenticated',
        'admin@alpify.com',
        crypt('alpify2024', gen_salt('bf')),
        NOW(),
        NOW(),
        NOW(),
        '{"provider": "email", "providers": ["email"]}',
        '{}'
    );
    
    -- Create the profile
    INSERT INTO public.profiles (user_id, username, role)
    VALUES (admin_user_id, 'admin', 'admin');
    
    RAISE NOTICE 'Admin user created with ID: %', admin_user_id;
END $$;