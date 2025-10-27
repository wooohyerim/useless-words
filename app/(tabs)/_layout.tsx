import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#9333ea',
        tabBarInactiveTintColor: '#9ca3af',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgb(242, 221, 248)'
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME'
        }}
      />
    </Tabs>
  );
}
