import React from 'react';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="inverted" />
      <Tabs
        initialRouteName="films"
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarStyle: {
            backgroundColor: COLORS.background,
            borderTopColor: COLORS.text,
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: COLORS.text,
          tabBarInactiveTintColor: COLORS.inactive,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="films"
          options={{
            title: 'All Films',
            tabBarLabel: 'Films',
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'film' : 'film-outline'}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="people"
          options={{
            title: 'People',
            tabBarLabel: 'People',
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'people-sharp' : 'people-outline'}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'My Favorites',
            tabBarLabel: 'Favorites',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'star' : 'star-outline'}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
