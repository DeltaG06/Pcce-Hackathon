// src/screens/PharmacyNavigator/PharmacyNavigator.tsx
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { PharmacyData } from '../../data/pharmacies';
import { MapScreen } from '../MapScreen/MapScreen';
import { PharmacyListScreen } from '../PharmacyListScreen/PharmacyListScreen';

type ViewMode = 'map' | 'list';

export const PharmacyNavigator: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [pharmacies, setPharmacies] = useState<PharmacyData[]>([]);

  const handleViewList = (pharmacyData: PharmacyData[]) => {
    setPharmacies(pharmacyData);
    setViewMode('list');
  };

  const handleViewMap = () => {
    setViewMode('map');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {viewMode === 'map' ? (
        <MapScreen onViewList={handleViewList} />
      ) : (
        <PharmacyListScreen
          pharmacies={pharmacies}
          onNavigateToMap={handleViewMap}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});