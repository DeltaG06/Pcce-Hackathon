import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'expo-router'; // 1. Import the router

const ProfileScreen: React.FC = () => {
  const { logout, session } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const router = useRouter(); // 2. Initialize the router

  // --- vvvvv THIS IS THE FIX vvvvv ---
  const handleLogout = async () => {
    // 3. Set spinner ON
    setIsLoggingOut(true);

    try {
      // 4. Await the logout() function from the hook.
      await logout();
      
      // 5. CRITICAL: Manually force the navigation.
      // We use 'replace' so the user can't go "back"
      // to the Profile screen.
      router.replace('/auth');

    } catch (error: any) {
      // 6. On failure, show an alert.
      Alert.alert('Logout Failed', error.message);

    } finally {
      // 7. This runs *no matter what* and guarantees
      // the spinner stops if the navigation fails.
      setIsLoggingOut(false);
    }
  };
  // --- ^^^^^ THIS IS THE FIX ^^^^^ ---

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Profile & Settings</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Information</Text>
          <Text style={styles.infoText}>
            You are logged in as:
          </Text>
          <Text style={styles.emailText}>
            {session?.user?.email || 'Loading...'}
          </Text>
        </View>

        <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleLogout}
            disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.logoutButtonText}>Log Out</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Add your local styles back in
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#deffe6ff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#343A40',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#ffffffff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343A40',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#DC3545',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    height: 55,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  }
});

export default ProfileScreen;