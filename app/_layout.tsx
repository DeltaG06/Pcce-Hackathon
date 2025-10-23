import { Stack, Slot } from 'expo-router';
import { Text, View } from 'react-native';
import { useAuth } from '../src/hooks/useAuth'; // Use your alias

/**
 * This is the new Root Layout.
 * It is the "brain" and is *always* mounted.
 * It will show the Loading screen, Auth screen, or Main App
 * based on the auth state.
 */
export default function RootLayout() {
  const { isAuthenticated, isLoading } = useAuth(); 

  // 1. Show a loading screen while the hook checks for a session
  if (isLoading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>Loading App Data...</Text>
        </View>
    ); 
  }

  // 2. We are no longer loading. Now, decide which "stack" to show.
  
  // By using <Slot />, we are telling Expo Router to render the
  // current "child" route.
  // - If we are logged OUT, the <Slot /> will be the 'auth' screen.
  // - If we are logged IN, the <Slot /> will be the '(tabs)' screen.
  
  // This Stack component wraps *everything*.
  return (
    <Stack screenOptions={{ headerShown: false }} key={isAuthenticated ? 'auth' : 'tabs'}>
      {!isAuthenticated ? (
        // Show the Auth screen.
        <Stack.Screen name="auth" />
      ) : (
        // Show the main app (tabs) and the chatbot modal.
        <>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="chatbot" options={{ presentation: 'modal' }} />
        </>
      )}
    </Stack>
  );
}