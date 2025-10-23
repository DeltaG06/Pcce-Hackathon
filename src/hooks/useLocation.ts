// src/hooks/useLocation.ts
import { useEffect, useState } from 'react';
import { LocationService } from '../services/location/locationService';
import { Location as LocationType } from '../types/location';

export const useLocation = () => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        setErrorMsg(null);
        const result = await LocationService.getCurrentLocation();
        if (result) {
          setLocation(result);
        } else {
          setErrorMsg("Could not retrieve location. Permission may have been denied.");
        }
      } catch (error) {
        setErrorMsg(error instanceof Error ? error.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };
    getLocation();
  }, []);

  return { location, loading, errorMsg };
};