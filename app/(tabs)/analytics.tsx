// app/(tabs)/analytics.tsx
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

// Asset import
const gheeImage = require('../../src/assets/ghee.png');
const ghaaImage = require('../../src/assets/ghaa.png');
const heatMapImage = require('../../src/assets/heatMap.png');

const AnalyticsScreen: React.FC = () => {
  const handleNavigateToMap = () => {
    // Using Expo Router's navigation - use the file path
    try {
      router.push('/map');
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback if /map doesn't exist yet
      alert('Map screen not found. Make sure app/map.tsx exists');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Health Analytics</Text>
        <Text style={styles.subtitle}>Symptom trends and medicine demand.</Text>

        {/* TrendChart Card */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.card}>
          <Text style={styles.cardTitle}>Reported Symptom Trends (7 Days)</Text>
          <BlurView intensity={30} style={styles.chartPlaceholder}>
            <Image source={ghaaImage} style={styles.image} resizeMode="cover" />
            <Text style={styles.overlayText}>TrendChart Component Here</Text>
          </BlurView>
        </Animated.View>

        {/* Nearby Pharmacies Card - Now clickable */}
        <Animated.View entering={FadeInUp.delay(200)} style={styles.card}>
          <Text style={styles.cardTitle}>Nearby Pharmacies</Text>
          <Pressable 
            style={styles.chartPlaceholder} 
            android_ripple={{ color: '#d4f2de' }}
            onPress={handleNavigateToMap}
          >
            <Image source={gheeImage} style={styles.image} resizeMode="cover" />
            <Text style={styles.overlayText}>
              📍 Tap to view nearby pharmacies on map
            </Text>
          </Pressable>
        </Animated.View>

        {/* HeatMap Card */}
        <Animated.View entering={FadeInUp.delay(300)} style={styles.card}>
          <Text style={styles.cardTitle}>HeatMap</Text>
          <BlurView intensity={40} style={styles.chartPlaceholder}>
            <Image source={heatMapImage} style={styles.image} resizeMode="cover" />
          </BlurView>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e6fff5',
  },
  container: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d6a4f',
    marginBottom: 15,
    marginTop: 25,
  },
  subtitle: {
    fontSize: 16,
    color: '#52796f',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#a7f3d0',
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1b4332',
  },
  chartPlaceholder: {
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9fbe9',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 12,
  },
  overlayText: {
    color: '#1b4332',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
  },
});

export default AnalyticsScreen;