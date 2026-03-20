import { router, Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1, backgroundColor: Colors[colorScheme ?? 'light'].background }}>
      <View style={{ height: 100, flexDirection: 'row', gap: 8, backgroundColor: 'brown', padding: 8 }}>
        <View style={styles.topBars}>
          <Text style={styles.topText}>Top text</Text>
        </View>
        <View style={styles.topBars}>
          <Text style={styles.topText}>Completed Today</Text>
        </View>
      </View>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarIconStyle: { display: 'none' },
          tabBarPosition: 'top',
          
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Active',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Completed',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
      </Tabs>
      <TouchableOpacity style={styles.fab} onPress={()=>{
        router.push('/receive-order');
      }}>
        <IconSymbol size={28} name="plus" color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  topBars: { 
    flex: 1, 
    backgroundColor: '#FFFFFF33',
    borderRadius: 8,
    padding: 8,
   },
   topText: {
    color: '#fff',
   },
    fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'brown',
    alignItems: 'center',
    justifyContent: 'center',
  },
});