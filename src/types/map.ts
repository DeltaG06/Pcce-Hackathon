// src/types/map.ts

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface MapRegion extends Coordinate {
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface MapMarker {
  id: string;
  coordinate: Coordinate;
  title: string;
  description?: string;
  pinColor?: string;
}

// Pharmacy-specific marker type
export interface PharmacyMarker extends MapMarker {
  name: string;
  address?: string;
  phone?: string;
  hours?: string;
  rating?: number;
}