// src/screens/MapScreen/MapScreen.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1, // This makes the screen take up the full height and width
  },
  centered: {
    flex: 1,
    justifyContent: 'center', // Vertically center
    alignItems: 'center',    // Horizontally center
  },
  toggleButton: {
    position: 'absolute',    // Position it relative to the parent
    top: 50,                 // 50px from the top
    right: 20,               // 20px from the right
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});