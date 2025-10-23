// src/screens/MapScreen/MapScreen.tsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { MapViewComponent } from '../../components/map/MapView';
import { useLocation } from '../../hooks/useLocation';
import { MapRegion, PharmacyMarker } from '../../types/map';

const INITIAL_REGION: MapRegion = {
  latitude: 15.4909,
  longitude: 73.8278,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

interface OverpassElement {
  id: number;
  lat: number;
  lon: number;
  tags?: { name?: string; operator?: string };
}
interface OverpassResponse {
  elements: OverpassElement[];
}

export const MapScreen: React.FC<{ onViewList?: (pharmacies: PharmacyMarker[]) => void }> = ({
  onViewList,
}) => {
  const { location, loading, errorMsg } = useLocation();
  const [region, setRegion] = useState<MapRegion>(INITIAL_REGION);
  const [pharmacies, setPharmacies] = useState<PharmacyMarker[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const lat = location?.latitude ?? INITIAL_REGION.latitude;
    const lon = location?.longitude ?? INITIAL_REGION.longitude;
    setRegion({ ...region, latitude: lat, longitude: lon });
    fetchNearbyPharmacies(lat, lon);
  }, [location]);

  const fetchNearbyPharmacies = async (latitude: number, longitude: number) => {
    setFetching(true);
    try {
      console.log('Fetching pharmacies around:', latitude, longitude);

      const radius = 5000; // 5 km
      const query = `
        [out:json];
        node["amenity"="pharmacy"](around:${radius},${latitude},${longitude});
        out;
      `;

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: query,
      });

      const data: OverpassResponse = await response.json();
      console.log('Overpass response:', data);

      const markers: PharmacyMarker[] = (data.elements || []).map((el) => ({
        id: el.id.toString(),
        name: el.tags?.name || 'Unnamed Pharmacy',
        coordinate: { latitude: el.lat, longitude: el.lon },
        title: el.tags?.name || 'Pharmacy',
        description: el.tags?.operator || 'Pharmacy nearby',
      }));

      console.log('Mapped pharmacy markers:', markers);
      setPharmacies(markers);
    } catch (error) {
      console.error('Error fetching pharmacies:', error);
    } finally {
      setFetching(false);
    }
  };

  if (loading || fetching) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="green" />
        <Text>{loading ? 'Getting your location...' : 'Finding nearby pharmacies...'}</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.centered}>
        <Text>Location Error: {errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapViewComponent region={region} markers={pharmacies} />
      {onViewList && pharmacies.length > 0 && (
        <View style={styles.buttonContainer}>
          <Button title="View Pharmacy List" onPress={() => onViewList(pharmacies)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
  },
});
