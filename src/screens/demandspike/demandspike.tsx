import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryArea } from 'victory-native';
import { supabase } from '../../../services/supabase/client';

interface DemandData {
  date: string;
  demand: number;
  medicine: string;
}

interface MedicineDemand {
  medicine: string;
  current_demand: number;
  previous_demand: number;
  spike_percentage: number;
}

const DemandSpikeScreen: React.FC = () => {
  const [demandData, setDemandData] = useState<DemandData[]>([]);
  const [medicineSpikes, setMedicineSpikes] = useState<MedicineDemand[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedicine, setSelectedMedicine] = useState<string>('All');
  const [availableMedicines, setAvailableMedicines] = useState<string[]>([]);

  useEffect(() => {
    fetchDemandData();
    fetchMedicineSpikes();
  }, []);

  const fetchDemandData = async () => {
    try {
      setLoading(true);
      
      // Fetch medicine inventory data over time
      const { data: inventoryData, error: inventoryError } = await supabase
        .from('inventory')
        .select(`
          quantity,
          last_updated,
          medicines!inner(name)
        `)
        .order('last_updated', { ascending: true });

      if (inventoryError) throw inventoryError;

      // Process data for chart
      const processedData = inventoryData?.map((item, index) => ({
        date: new Date(item.last_updated).toLocaleDateString(),
        demand: item.quantity,
        medicine: item.medicines.name,
      })) || [];

      setDemandData(processedData);
      
      // Get unique medicines for filter
      const medicines = [...new Set(processedData.map(item => item.medicine))];
      setAvailableMedicines(['All', ...medicines]);

    } catch (error) {
      console.error('Error fetching demand data:', error);
      Alert.alert('Error', 'Failed to load demand data');
    } finally {
      setLoading(false);
    }
  };

  const fetchMedicineSpikes = async () => {
    try {
      // Calculate demand spikes based on inventory changes
      const { data: spikeData, error } = await supabase
        .from('inventory')
        .select(`
          quantity,
          last_updated,
          medicines!inner(name)
        `)
        .order('last_updated', { ascending: false });

      if (error) throw error;

      // Group by medicine and calculate spikes
      const medicineGroups = spikeData?.reduce((acc, item) => {
        const medicine = item.medicines.name;
        if (!acc[medicine]) {
          acc[medicine] = [];
        }
        acc[medicine].push(item);
        return acc;
      }, {} as Record<string, any[]>) || {};

      const spikes: MedicineDemand[] = Object.entries(medicineGroups).map(([medicine, data]) => {
        const sortedData = data.sort((a, b) => new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime());
        const current = sortedData[0]?.quantity || 0;
        const previous = sortedData[1]?.quantity || 0;
        const spikePercentage = previous > 0 ? ((current - previous) / previous) * 100 : 0;
        
        return {
          medicine,
          current_demand: current,
          previous_demand: previous,
          spike_percentage: spikePercentage,
        };
      });

      setMedicineSpikes(spikes.sort((a, b) => b.spike_percentage - a.spike_percentage));

    } catch (error) {
      console.error('Error fetching medicine spikes:', error);
    }
  };

  const filteredData = selectedMedicine === 'All' 
    ? demandData 
    : demandData.filter(item => item.medicine === selectedMedicine);

  const renderSpikeCard = (spike: MedicineDemand, index: number) => (
    <View key={index} style={styles.spikeCard}>
      <Text style={styles.medicineName}>{spike.medicine}</Text>
      <View style={styles.spikeInfo}>
        <Text style={styles.spikeLabel}>Current Demand:</Text>
        <Text style={styles.spikeValue}>{spike.current_demand}</Text>
      </View>
      <View style={styles.spikeInfo}>
        <Text style={styles.spikeLabel}>Previous Demand:</Text>
        <Text style={styles.spikeValue}>{spike.previous_demand}</Text>
      </View>
      <View style={styles.spikeInfo}>
        <Text style={[
          styles.spikePercentage,
          { color: spike.spike_percentage > 0 ? '#ef4444' : '#10b981' }
        ]}>
          {spike.spike_percentage > 0 ? '+' : ''}{spike.spike_percentage.toFixed(1)}%
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading demand data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Demand Spike Analysis</Text>
        <Text style={styles.subtitle}>Track medicine demand patterns and identify spikes</Text>
      </View>

      {/* Medicine Filter */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Medicine:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {availableMedicines.map((medicine) => (
            <TouchableOpacity
              key={medicine}
              style={[
                styles.filterButton,
                selectedMedicine === medicine && styles.filterButtonActive
              ]}
              onPress={() => setSelectedMedicine(medicine)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedMedicine === medicine && styles.filterButtonTextActive
              ]}>
                {medicine}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Demand Chart */}
      {filteredData.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Demand Trend</Text>
          <VictoryChart
            theme={VictoryTheme.material}
            height={300}
            padding={{ left: 60, top: 20, right: 20, bottom: 40 }}
          >
            <VictoryAxis dependentAxis />
            <VictoryAxis />
            <VictoryArea
              data={filteredData}
              x="date"
              y="demand"
              style={{
                data: { fill: '#2563EB', fillOpacity: 0.3 },
              }}
            />
            <VictoryLine
              data={filteredData}
              x="date"
              y="demand"
              style={{
                data: { stroke: '#2563EB', strokeWidth: 3 },
              }}
            />
          </VictoryChart>
        </View>
      )}

      {/* Medicine Spikes */}
      <View style={styles.spikesContainer}>
        <Text style={styles.spikesTitle}>Demand Spikes</Text>
        {medicineSpikes.length > 0 ? (
          medicineSpikes.map((spike, index) => renderSpikeCard(spike, index))
        ) : (
          <Text style={styles.noDataText}>No spike data available</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  filterContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  filterButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  spikesContainer: {
    padding: 16,
  },
  spikesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  spikeCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  spikeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  spikeLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  spikeValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  spikePercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  noDataText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 16,
    marginTop: 20,
  },
});

export default DemandSpikeScreen;