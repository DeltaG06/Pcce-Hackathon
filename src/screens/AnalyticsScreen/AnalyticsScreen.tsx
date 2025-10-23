import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

// NOTE: All styling is defined locally.
const AnalyticsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Health Analytics</Text>
        <Text style={styles.subtitle}>Symptom trends and medicine demand.</Text>

        {/* Placeholder for TrendChart component */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reported Symptom Trends (7 Days)</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.placeholderText}>
              [Analytics Guy's Domain: Symptom TrendChart Component Goes Here]
            </Text>
          </View>
        </View>

        {/* Placeholder for StatsCard component */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Local Medicine Demand</Text>
           <View style={styles.chartPlaceholder}>
            <Text style={styles.placeholderText}>
              [Analytics Guy's Domain: Demand Prediction StatsCard Goes Here]
            </Text>
          </View>
        </View>

        {/* Placeholder for HeatMap component */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>HeatMap</Text>
           <View style={styles.chartPlaceholder}>
            <Text style={styles.placeholderText}>
              [Analytics Guy's Domain: HeatMap Goes Here]
            </Text>
          </View>
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
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#343A40', // Primary text
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C757D', // Secondary text
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#ccffc4ff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#343A40',
  },
  chartPlaceholder: {
    height: 150,
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#6C757D',
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
  }
});

export default AnalyticsScreen;