import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '@hooks/useAuth'; // Import the hook
import { COLORS } from '@utils/constants'; // Assuming COLORS is available

const HomeScreen: React.FC = () => {
 
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to the Platform</Text>
          <Text style={styles.subtitle}>Track symptoms and find local medical availability.</Text>
        </View>
        
        {/* Placeholder for AlertBanner */}
        <View style={[styles.card, styles.alertCard]}>
          <Text style={styles.cardTitle}>Live Health Alert Status</Text>
          <Text style={styles.cardText}>
            Regional status: **Stable**. No unusual spikes detected.
          </Text>
        </View>
        
        {/* Placeholder for Symptom Reporting */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Report Symptoms Anonymously</Text>
          <Text style={styles.cardText}>
            Your anonymous reports help local officials detect early outbreaks.
          </Text>
          <Text style={styles.quickLink}>Report Now →</Text>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3fff5ff', // Light background
  },
  container: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#06004aff', // Primary Green
  },
  subtitle: {
    fontSize: 16,
    color: '#4b6276ff', // Secondary text
    marginTop: 4,
  },
  card: {
    backgroundColor: '#ccffc4ff', // White card background
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  alertCard: {
    borderLeftWidth: 6,
    borderLeftColor: '#28A745', // Success Green
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#343A40', // Primary text
  },
  cardText: {
    fontSize: 14,
    color: '#6C757D', // Secondary text
    marginBottom: 10,
  },
  quickLink: {
    marginTop: 5,
    color: '#007BFF', // Blue accent/link color
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
  // STYLES FOR THE LOGOUT BUTTON
  logoutButton: {
    backgroundColor: '#DC3545', // Red color for danger/logout
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  }
});

export default HomeScreen;