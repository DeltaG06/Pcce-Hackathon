import { Tabs, router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    // 1. Wrap the Tabs in a View to contain the FAB
    <View style={{ flex: 1 }}>
      
      {/* 2. The Tabs component fills the View */}
      <Tabs screenOptions={{ 
          headerShown: false, 
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: '#494949ff',
          tabBarStyle: {
              padding: 4,
              height: 65,
              borderRadius: 15,
              marginHorizontal: 15,
              position: 'absolute',
              bottom: 10,
              backgroundColor: '#efffe9ff',
              borderColor: '#4cc044ff',
              borderWidth: 1,
          }
      }}>
        
        {/* All your existing tabs */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <AntDesign name="home" color={color} size={24} />,
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: 'Analytics',
            tabBarIcon: ({ color }) => <AntDesign name="bar-chart" color={color} size={24} />,
          }}
        />
        <Tabs.Screen
          name="alerts"
          options={{
            title: 'Alerts',
            tabBarIcon: ({ color }) => <AntDesign name="warning" color={color} size={24} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <AntDesign name="user" color={color} size={24} />,
          }}
        />
      </Tabs>

      {/* 3. The new Floating Action Button (FAB) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/chatbot')} // Navigates to the modal
      >
        <AntDesign name="message" size={26} color="#FFFFFF" />
      </TouchableOpacity>

    </View>
  );
}

// 4. Styles for the FAB
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 100, // Positioned 20px above the 60px tab bar
    backgroundColor: '#30ad5eff', // Blue accent color
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#11ff00ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.7,
    shadowRadius: 10,
  }
});