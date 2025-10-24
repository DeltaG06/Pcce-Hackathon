// src/screens/MapScreen/MapScreen.tsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { MapViewComponent } from '../../components/map/MapView';
import { PHARMACIES_DATA, PharmacyData } from '../../data/pharmacies';
import { useLocation } from '../../hooks/useLocation';
import { MapMarker, MapRegion } from '../../types/map';

const INITIAL_REGION: MapRegion = {
  latitude: 15.4909,
  longitude: 73.8278,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

interface MapScreenProps {
  onViewList?: (pharmacies: PharmacyData[]) => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({ onViewList }) => {
  const { location, loading, errorMsg } = useLocation();
  const [region, setRegion] = useState<MapRegion>(INITIAL_REGION);
  const [pharmacies] = useState<MapMarker[]>(PHARMACIES_DATA);

  useEffect(() => {
    if (location) {
      const lat = location.latitude;
      const lon = location.longitude;
      setRegion({
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [location]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Location Error</Text>
        <Text style={styles.errorSubtext}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapViewComponent region={region} markers={pharmacies} />
      
      {onViewList && pharmacies.length > 0 && (
        <Pressable
          style={({ pressed }) => [
            styles.listButton,
            pressed && styles.listButtonPressed,
          ]}
          onPress={() => onViewList(PHARMACIES_DATA)}
        >
          <Text style={styles.listButtonText}>📋 View Pharmacy List</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ef4444',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  listButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#10b981',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  listButtonPressed: {
    backgroundColor: '#059669',
    transform: [{ scale: 0.95 }],
  },
  listButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});