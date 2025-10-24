// app/_layout.tsx
import { AntDesign } from '@expo/vector-icons';
import { Stack, Tabs, router } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="map" 
        options={{ 
          headerShown: true,
          presentation: 'card',
          title: 'Pharmacy Map'
        }} 
      />
      <Stack.Screen 
        name="pharmacy-list" 
        options={{ 
          headerShown: true,
          presentation: 'card',
          title: 'Nearby Pharmacies'
        }} 
      />
      <Stack.Screen 
        name="chatbot" 
        options={{ 
          presentation: 'modal',
          headerShown: false 
        }} 
      />
    </Stack>
  );
}

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
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
        
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <AntDesign name="home" color={color} size={24} />,
          }}
        />

        <Tabs.Screen
          name="pharmacies"
          options={{
            title: 'Pharmacies',
            tabBarIcon: ({ color }) => <AntDesign name="medicine-box" color={color} size={24} />,
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

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/chatbot')}
      >
        <AntDesign name="message" size={26} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 100,
    backgroundColor: '#30ad5eff',
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