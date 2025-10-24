// navigation/types.ts
// This file defines the types for all screens in your navigation stack

export type RootStackParamList = {
  // Auth screens
  Auth: undefined;
  
  // Main screens
  Home: undefined;
  ChatBotScreen: undefined;
  Alerts: undefined;
  Analytics: undefined;
  Map: undefined;
  DemandSpike: undefined;
  PharmacyList: undefined;
  PharmacyListScreen: undefined;
  Profile: undefined;
  
  // Add any other screens here with their params
  // Example with params:
  // ScreenName: { paramName: string; anotherParam: number };
};

// Helper type for navigation prop
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Helper type for route prop
import { RouteProp } from '@react-navigation/native';

export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;