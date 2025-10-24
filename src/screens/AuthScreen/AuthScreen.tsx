import React, { useState } from 'react';
// --- THIS IS THE SYNTAX FIX ---
import { View, Text, Alert, SafeAreaView, ScrollView } from 'react-native'; 
// --- END OF FIX ---
import { useAuth } from '@hooks/useAuth'; 
import AuthForm from '@components/auth/AuthForm/AuthForm';
import AuthInput from '@components/auth/AuthInput/AuthInput';
import AuthButton from '@components/auth/AuthButton/AuthButton';
import styles from './AuthScreen.styles'; 
import { useRouter } from 'expo-router'; // Import the router

export default function AuthScreen() {
  const { login, signup } = useAuth(); 
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState(''); 
  
  const router = useRouter(); // Initialize the router

  // Helper functions to clear the error on new input
  const onEmailChange = (text: string) => {
    setEmail(text);
    if (error) setError(''); 
  };
  
  const onPasswordChange = (text: string) => {
    setPassword(text);
    if (error) setError(''); 
  };

  const handleSubmit = async () => {
    // Validation for empty fields
    if (!email || !password) {
      setError('Please enter both email and password.');
      return; 
    }

    setIsFormLoading(true);
    setError(''); // Clear previous errors

    try {
      if (isLoginMode) {
        // This is the Login flow
        await login(email, password); 
        
        // Manually force the navigation to the "gatekeeper"
        // which will then send the user to the HomeScreen
        router.replace('/');

      } else {
        // This is the Sign Up flow
        await signup(email, password); 
        
        // Show a success message (Alert is fine here)
        Alert.alert('Success', 'Registration successful! Please log in.');
        setIsLoginMode(true); // Switch back to login mode
      }
    } catch (error: any) {
      // Catch any error from Supabase (e.g., "Invalid login credentials")
      let errorMessage = (error && error.message) ? error.message : "An unknown error occurred.";
      setError(errorMessage);
    } finally {
      // Stop the spinner no matter what
      setIsFormLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{isLoginMode ? 'Welcome Back' : 'Create Account'}</Text>
        <Text style={styles.title}>
          {isLoginMode ? 'Log in to continue' : 'Join the community'}
        </Text>
        
        <AuthForm>
          <AuthInput 
            placeholder="Email"
            value={email}
            onChangeText={onEmailChange} // Use new helper
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isFormLoading}
          />
          <AuthInput
            placeholder="Password"
            value={password}
            onChangeText={onPasswordChange} // Use new helper
            secureTextEntry
            editable={!isFormLoading}
          />
          
          {/* This is the error text display */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <AuthButton 
            title={isLoginMode ? 'Log In' : 'Register'} 
            onPress={handleSubmit} 
            disabled={isFormLoading} 
            loading={isFormLoading}
          />
        </AuthForm>

        <AuthButton
          title={isLoginMode ? 'Need an account? Register' : 'Already registered? Log In'}
          onPress={() => setIsLoginMode(!isLoginMode)}
          type="tertiary"
          disabled={isFormLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}