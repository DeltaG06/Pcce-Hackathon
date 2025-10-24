import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@services/supabase/client'; 
import { signOut, signIn, signUp } from '@services/supabase/auth'; 

type Session = Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session'] | null;

export const useAuth = () => {
  const [session, setSession] = useState<Session>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This listener is the single source of truth.
    // It handles app load (INITIAL_SESSION) and logins (SIGNED_IN)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setIsLoading(false);
      }
    );
    return () => {
        if (subscription) {
            subscription.unsubscribe();
        }
    };
  }, []); // Runs only once

  const login = async (email: string, password: string) => {
    try {
      // The listener will catch the 'SIGNED_IN' event
      return await signIn(email, password);
    } catch (error) {
      console.error("--- ERROR IN useAuth.login ---", error);
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      return await signUp(email, password);
    } catch (error) {
      console.error("--- ERROR IN useAuth.signup ---", error);
      throw error;
    }
  };
  
  // --- vvvvv THIS IS THE FIX vvvvv ---
  // We are making this a simple, robust async function again.
  // It will be the UI's job to handle navigation.
  const logout = useCallback(async () => {
    try {
      // 1. Tell Supabase to sign out.
      await signOut(); 
      // 2. Manually set session to null to update the hook's state.
      setSession(null);
    } catch (error) {
      console.error('Logout failed:', error);
      setSession(null); // Force local logout even on error
      throw error; // Re-throw for the UI
    }
  }, []);
  // --- ^^^^^ THIS IS THE FIX ^^^^^ ---
  
  return {
    session,
    isLoading,
    isAuthenticated: !!session,
    login,
    logout,
    signup,
  };
};