// src/services/location/locationService.ts
import * as Location from 'expo-location';
import { Location as LocationType } from '../../types/location';

export class LocationService {
  static async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission denied');
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error requesting location permission:", error);
      return false;
    }
  }

  static async getCurrentLocation(): Promise<LocationType | null> {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) return null;

    try {
      const location = await Location.getCurrentPositionAsync({});
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    } catch (error) {
      console.error("Error getting current location:", error);
      return null;
    }
  }
}