// src/data/pharmacies.ts
import { PharmacyMarker } from '../types/map';

export type PharmacyData = PharmacyMarker;

export const PHARMACIES_DATA: PharmacyData[] = [
  {
    id: "2100055211",
    name: "Farmacia Salcete",
    title: "Farmacia Salcete",
    description: "Pharmacy nearby",
    coordinate: {
      latitude: 15.4985961,
      longitude: 73.8274921
    },
    pinColor: "green"
  },
  {
    id: "3250334427",
    name: "Roger's Healthcare",
    title: "Roger's Healthcare",
    description: "Pharmacy nearby",
    coordinate: {
      latitude: 15.4808305,
      longitude: 73.8119033
    },
    pinColor: "green"
  },
  {
    id: "3250334861",
    name: "Unnamed Pharmacy",
    title: "Pharmacy",
    description: "Pharmacy nearby",
    coordinate: {
      latitude: 15.4756728,
      longitude: 73.8121551
    },
    pinColor: "green"
  },
  {
    id: "3250335692",
    name: "Unnamed Pharmacy",
    title: "Pharmacy",
    description: "Pharmacy nearby",
    coordinate: {
      latitude: 15.4792457,
      longitude: 73.8121499
    },
    pinColor: "green"
  },
  {
    id: "4081440470",
    name: "Unnamed Pharmacy",
    title: "Pharmacy",
    description: "Pharmacy nearby",
    coordinate: {
      latitude: 15.5007457,
      longitude: 73.8260766
    },
    pinColor: "green"
  },
  {
    id: "4258764890",
    name: "Unity medical stores",
    title: "Unity medical stores",
    description: "Pharmacy nearby",
    coordinate: {
      latitude: 15.4848807,
      longitude: 73.8115219
    },
    pinColor: "green"
  },
  {
    id: "4259807597",
    name: "united pharmacy",
    title: "united pharmacy",
    description: "Pharmacy nearby",
    coordinate: {
      latitude: 15.460546,
      longitude: 73.8041
    },
    pinColor: "green"
  },
  {
    id: "4259822591",
    name: "Marvel Pharmacy",
    title: "Marvel Pharmacy",
    description: "Pharmacy nearby",
    coordinate: {
      latitude: 15.462613,
      longitude: 73.80554
    },
    pinColor: "green"
  },
  {
    id: "4494012690",
    name: "Symphony",
    title: "Symphony",
    description: "Pharmacy nearby",
    coordinate: {
      latitude: 15.5271397,
      longitude: 73.8264713
    },
    pinColor: "green"
  },
  {
    id: "4494043091",
    name: "Perpetual",
    title: "Perpetual",
    description: "Pharmacy nearby",
    coordinate: {
      latitude: 15.52709,
      longitude: 73.8264824
    },
    pinColor: "green"
  },
  {
    id: "4524300541",
    name: "Tapasvi",
    title: "Tapasvi",
    description: "Pharmacy nearby",
    coordinate: {
      latitude: 15.5255049,
      longitude: 73.8264942
    },
    pinColor: "green"
  },
  {
    id: "4537380492",
    name: "Rock Of Ages Medical Stores",
    title: "Rock Of Ages Medical Stores",
    description: "Pharmacy nearby",
    coordinate: {
      latitude: 15.485703,
      longitude: 73.853645
    },
    pinColor: "green"
  },
  {
    id: "4561922823",
    name: "Pharmax",
    title: "Pharmax",
    description: "Pharmacy nearby",
    coordinate: {
      latitude: 15.4882918,
      longitude: 73.8207687
    },
    pinColor: "green"
  },
  {
    id: "4561954065",
    name: "Taj Medical Stores",
    title: "Taj Medical Stores",
    description: "Pharmacy nearby",
    coordinate: {
      latitude: 15.4950113,
      longitude: 73.8209768
    },
    pinColor: "green"
  },
  {
    id: "4745150126",
    name: "Madonna",
    title: "Madonna",
    description: "Pharmacy nearby",
    coordinate: {
      latitude: 15.4695148,
      longitude: 73.84654
    },
    pinColor: "green"
  },
  {
    id: "6639495985",
    name: "Matrix",
    title: "Matrix",
    description: "Pharmacy nearby",
    coordinate: {
      latitude: 15.4798865,
      longitude: 73.8142224
    },
    pinColor: "green"
  },
  {
    id: "7968024585",
    name: "Neha",
    title: "Neha",
    description: "Pharmacy nearby",
    coordinate: {
      latitude: 15.4937544,
      longitude: 73.8303598
    },
    pinColor: "green"
  },
  {
    id: "12596558808",
    name: "Wellness forever",
    title: "Wellness forever",
    description: "Pharmacy nearby",
    coordinate: {
      latitude: 15.5332245,
      longitude: 73.8241067
    },
    pinColor: "green"
  }
];

// Helper function to get pharmacy by ID
export const getPharmacyById = (id: string): PharmacyData | undefined => {
  return PHARMACIES_DATA.find(pharmacy => pharmacy.id === id);
};

// Helper function to get pharmacies within a radius
export const getPharmaciesNearLocation = (
  latitude: number,
  longitude: number,
  radiusKm: number = 5
): PharmacyData[] => {
  return PHARMACIES_DATA.filter(pharmacy => {
    const distance = calculateDistance(
      latitude,
      longitude,
      pharmacy.coordinate.latitude,
      pharmacy.coordinate.longitude
    );
    return distance <= radiusKm;
  });
};

// Calculate distance between two coordinates in kilometers (Haversine formula)
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

// Export count for reference
export const TOTAL_PHARMACIES = PHARMACIES_DATA.length;