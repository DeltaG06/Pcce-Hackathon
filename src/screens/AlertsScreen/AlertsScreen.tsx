import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';

// Mock data for alerts (will come from Supabase/Alerts service later)
const MOCK_ALERTS = [
  { id: '1', title: 'High Fever Cluster Reported', area: 'Margao City', time: '2h ago', level: 'warning' },
  { id: '2', title: 'Medicine Stock Update', area: 'Panjim Pharmacies', time: '8h ago', level: 'info' },
  { id: '3', title: 'Regional Advisory: Flu Season', area: 'Goa State', time: '1d ago', level: 'info' },
];

const AlertsScreen: React.FC = () => {
  
  const renderItem = ({ item }: { item: typeof MOCK_ALERTS[0] }) => (
    <View style={[styles.card, item.level === 'warning' ? styles.warningCard : styles.infoCard]}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardMeta}>{item.area}  •  {item.time}</Text>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.headerTitle}>Community Alerts</Text>
      
      <FlatList
        data={MOCK_ALERTS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No active alerts.</Text>}
      />
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3fff5ff',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#343A40',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    borderLeftWidth: 6,
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // Default to info blue
  },
  infoCard: {
    borderColor: '#007BFF', // Blue for info
  },
  warningCard: {
    borderColor: '#FFC107', // Yellow for warning
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343A40',
  },
  cardMeta: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6C757D',
    marginTop: 50,
    fontSize: 16,
  }
});

export default AlertsScreen;