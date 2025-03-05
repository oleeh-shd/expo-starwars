import React, { useEffect, useState } from 'react';
import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { SplashScreen, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { View, StyleSheet } from 'react-native';
import { useFilmsStore } from '@/zustand/films-store';

export default function RootLayout() {
  const { loading, fetchFilms } = useFilmsStore();
  const [appReady, setAppReady] = useState(false);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    const loadApp = async () => {
      fetchFilms();
      await new Promise((resolve) => setTimeout(resolve, 1000));

      opacity.value = withTiming(0, { duration: 600, easing: Easing.ease });
      scale.value = withTiming(3, {
        duration: 600,
        easing: Easing.out(Easing.exp),
      });

      setTimeout(() => {
        setAppReady(true);
        SplashScreen.hideAsync();
      }, 700);
    };

    loadApp();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <>
      {(!appReady || loading) && (
        <View style={styles.splashContainer}>
          <Animated.Image
            source={require('../assets/images/logo.png')}
            style={[styles.splashImage, animatedStyle]}
            resizeMode="contain"
          />
        </View>
      )}
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

const styles = StyleSheet.create({
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: '#000', // Цвет фона при загрузке
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  splashImage: {
    width: 150,
    height: 150,
  },
});
