import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isAuthenticated: false,
    isAdmin: false,
    isLoading: true,
  });

  const { toast } = useToast();

  const checkAdminStatus = async (user: User): Promise<boolean> => {
    try {
      // Check if user has admin profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (profile?.role === 'admin') {
        return true;
      }

      // Fallback: Check if user email is admin email
      if (profileError && user.email === 'admin@alpifyglobal.com') {
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };

  const updateAuthState = async (session: Session | null) => {
    if (session?.user) {
      const isAdmin = await checkAdminStatus(session.user);
      setState({
        user: session.user,
        session,
        isAuthenticated: true,
        isAdmin,
        isLoading: false,
      });
    } else {
      setState({
        user: null,
        session: null,
        isAuthenticated: false,
        isAdmin: false,
        isLoading: false,
      });
    }
  };

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Handle username to email conversion
      if (!email.includes('@')) {
        if (email === 'admin') {
          email = 'admin@alpifyglobal.com';
        } else {
          return { success: false, error: 'Invalid username or email.' };
        }
      }

      setState(prev => ({ ...prev, isLoading: true }));

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setState(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: error.message };
      }

      if (data.user) {
        const isAdmin = await checkAdminStatus(data.user);
        
        if (!isAdmin) {
          await supabase.auth.signOut();
          setState(prev => ({ ...prev, isLoading: false }));
          return { success: false, error: 'Access denied. Admin privileges required.' };
        }

        await updateAuthState(data.session);
        
        toast({
          title: 'Login successful',
          description: 'Welcome back, admin!',
        });

        return { success: true };
      }

      return { success: false, error: 'Authentication failed.' };
    } catch (error) {
      console.error('Sign in error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'An unexpected error occurred.' };
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      setState({
        user: null,
        session: null,
        isAuthenticated: false,
        isAdmin: false,
        isLoading: false,
      });
      
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        await updateAuthState(session);
      } catch (error) {
        console.error('Initial session error:', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await updateAuthState(session);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    ...state,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
