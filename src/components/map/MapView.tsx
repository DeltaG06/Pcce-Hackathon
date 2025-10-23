// src/components/map/MapView.tsx
import React from 'react';
import MapView, { Marker, Region, UrlTile } from 'react-native-maps';
import { MapMarker } from '../../types/map';
import { styles } from './MapView.styles';

interface MapViewProps {
  region: Region;
  showUserLocation?: boolean;
  markers?: MapMarker[];
  onRegionChange?: (region: Region) => void;
}

export const MapViewComponent: React.FC<MapViewProps> = ({
  region,
  showUserLocation = true,
  markers = [],
  onRegionChange,
}) => {
  return (
    <MapView
      style={styles.map}
      region={region}
      showsUserLocation={showUserLocation}
      showsMyLocationButton={true}
      onRegionChange={onRegionChange}
    >
      {/* OpenStreetMap tiles */}
      <UrlTile
        urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
      />

      {/* Pharmacy markers */}
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={marker.coordinate}
          title={marker.title}
          description={marker.description}
          pinColor={marker.pinColor || 'red'}
        />
      ))}
    </MapView>
  );
};
