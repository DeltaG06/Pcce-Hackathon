// src/screens/AnalyticsScreen/AnalyticsScreen.tsx (Updated with Trend Chart)
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import HeatMapComponent from '../../components/map/HeatMap';
import MedicineChart from '../../components/MedicineChart/MedicineChart';
import SymptomTrendChart from '../../components/SymptomTrendChart/SymptomTrendChart';

// Asset import
const gheeImage = require('../../assets/ghee.png');

// Update these screen names to match YOUR actual navigation setup
type RootStackParamList = {
  AnalyticsHome?: undefined;
  Analytics?: undefined;
  Map: undefined;
  // Add other screens here if you have them
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, any>;

const AnalyticsScreen: React.FC = () => {
  // Using useNavigation hook instead of prop
  const navigation = useNavigation<NavigationProp>();

  const handleNavigateToMap = () => {
    try {
      // @ts-ignore - temporary fix for navigation typing
      navigation.navigate('Map');
    } catch (error) {
      console.error('Navigation error:', error);
      alert('Unable to navigate to map. Please check navigation setup.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Health Analytics</Text>
        <Text style={styles.subtitle}>Symptom trends and medicine demand.</Text>

        {/* Medicine Demand Chart */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.card}>
          <MedicineChart />
        </Animated.View>

        {/* Symptom Heatmap */}
        <Animated.View entering={FadeInUp.delay(200)} style={styles.card}>
          <Text style={styles.cardTitle}>Symptom Heatmap</Text>
          <View style={styles.mapContainer}>
            <HeatMapComponent />
          </View>
        </Animated.View>

        {/* Symptom Trend Chart */}
        <Animated.View entering={FadeInUp.delay(300)} style={styles.card}>
          <SymptomTrendChart />
        </Animated.View>

        {/* Nearby Pharmacies Card - Now clickable */}
        <Animated.View entering={FadeInUp.delay(400)} style={styles.card}>
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
  mapContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default AnalyticsScreen;