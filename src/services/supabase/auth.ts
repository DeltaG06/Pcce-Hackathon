import { supabase } from './client';

/**
 * Signs up a new user.
 * This function is designed to THROW an error on failure.
 */
export async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        console.error('Supabase Sign Up Error:', error.message);
        // This throw is caught by the useAuth hook
        throw new Error(error.message);
    }
    return data;
}

/**
 * Signs in an existing user.
 * This function is designed to THROW an error on failure.
 */
export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.error('Supabase Sign In Error:', error.message);
        // This throw is caught by the useAuth hook
        throw new Error(error.message);
    }
    
    // On success, the listener in useAuth will handle the session.
    return data;
}

/**
 * Signs out the current user.
 * This function is designed to THROW an error on failure.
 */
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
        console.error('Supabase Sign Out Error:', error.message);
        throw new Error(error.message);
    }
}