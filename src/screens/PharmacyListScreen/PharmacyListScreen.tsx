// src/screens/PharmacyListScreen/PharmacyListScreen.tsx
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Linking,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { PharmacyData } from '../../data/pharmacies';
import { useLocation } from '../../hooks/useLocation';

interface PharmacyWithDistance extends PharmacyData {
  distance: number;
}

interface PharmacyListScreenProps {
  pharmacies: PharmacyData[];
  onNavigateToMap?: () => void;
}

export const PharmacyListScreen: React.FC<PharmacyListScreenProps> = ({
  pharmacies,
  onNavigateToMap,
}) => {
  const { location, loading } = useLocation();
  const [sortedPharmacies, setSortedPharmacies] = useState<PharmacyWithDistance[]>([]);

  useEffect(() => {
    if (location && pharmacies.length > 0) {
      const pharmaciesWithDistance = pharmacies.map((pharmacy) => ({
        ...pharmacy,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          pharmacy.coordinate.latitude,
          pharmacy.coordinate.longitude
        ),
      }));

      // Sort by distance (nearest first)
      pharmaciesWithDistance.sort((a, b) => a.distance - b.distance);
      setSortedPharmacies(pharmaciesWithDistance);
    }
  }, [location, pharmacies]);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRad = (degrees: number): number => {
    return degrees * (Math.PI / 180);
  };

  const openMaps = (pharmacy: PharmacyData) => {
    const { latitude, longitude } = pharmacy.coordinate;
    const label = encodeURIComponent(pharmacy.name);
    
    const url = Platform.select({
      ios: `maps://app?daddr=${latitude},${longitude}&q=${label}`,
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`,
    });

    if (url) {
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          // Fallback to Google Maps web
          Linking.openURL(
            `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
          );
        }
      });
    }
  };

  const renderPharmacyItem = ({ item, index }: { item: PharmacyWithDistance; index: number }) => (
    <Pressable
      style={({ pressed }) => [
        styles.pharmacyCard,
        pressed && styles.pharmacyCardPressed,
      ]}
      onPress={() => openMaps(item)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>{index + 1}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.pharmacyName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.pharmacyDescription} numberOfLines={1}>
            {item.description}
          </Text>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={styles.distanceContainer}>
          <Text style={styles.distanceIcon}>📍</Text>
          <Text style={styles.distanceText}>
            {item.distance < 1
              ? `${(item.distance * 1000).toFixed(0)} m`
              : `${item.distance.toFixed(1)} km`}
          </Text>
        </View>
        <View style={styles.directionButton}>
          <Text style={styles.directionText}>Get Directions →</Text>
        </View>
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Unable to get your location</Text>
        <Text style={styles.errorSubtext}>
          Please enable location services to see nearby pharmacies
        </Text>
      </View>
    );
  }

  if (sortedPharmacies.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No pharmacies found nearby</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Pharmacies</Text>
        <Text style={styles.headerSubtitle}>
          {sortedPharmacies.length} pharmacy{sortedPharmacies.length !== 1 ? 'ies' : ''} found
        </Text>
      </View>

      <FlatList
        data={sortedPharmacies}
        renderItem={renderPharmacyItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={styles.listFooter} />}
      />

      {onNavigateToMap && (
        <Pressable
          style={({ pressed }) => [
            styles.mapButton,
            pressed && styles.mapButtonPressed,
          ]}
          onPress={onNavigateToMap}
        >
          <Text style={styles.mapButtonText}>🗺️ View on Map</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  listContent: {
    padding: 16,
  },
  pharmacyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pharmacyCardPressed: {
    backgroundColor: '#f9fafb',
    transform: [{ scale: 0.98 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rankBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContent: {
    flex: 1,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  pharmacyDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  distanceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
  },
  directionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f0fdf4',
    borderRadius: 6,
  },
  directionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
  },
  listFooter: {
    height: 80,
  },
  mapButton: {
    position: 'absolute',
    bottom: 20,
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
  mapButtonPressed: {
    backgroundColor: '#059669',
    transform: [{ scale: 0.95 }],
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});