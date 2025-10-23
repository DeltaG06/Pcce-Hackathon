// src/types/map.ts
import { Location } from './location';

export interface MapMarker {
  id: string;
  coordinate: Location;
  title: string;
  description?: string;
  pinColor?: string;
}

export interface PharmacyMarker extends MapMarker {
  name: string;
}

export interface HeatMapPoint {
  latitude: number;
  longitude: number;
  weight: number;
}

export interface MapRegion extends Location {
  latitudeDelta: number;
  longitudeDelta: number;
}