import { FilmsApi } from '@/api/films';
import { COLORS } from '@/constants/colors';
import { Film } from '@/types/films';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAVORITES_KEY } from '@/constants';

const Details = () => {
  const { id } = useLocalSearchParams();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const getFilm = async () => {
    try {
      const film = await FilmsApi.getFilm(id as string);
      setFilm(film);
      checkIsFavorite(film);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getFilm();
    setRefreshing(false);
  };

  const checkIsFavorite = async (film: Film) => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');

      if (favorites) {
        const favoriteFilms = JSON.parse(favorites) as Film[];
        const isFavorite = favoriteFilms.some(
          (f: Film) => f.episode_id === film.episode_id,
        );
        setIsFavorite(isFavorite);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      let favoriteFilms = favorites ? (JSON.parse(favorites) as Film[]) : [];

      if (isFavorite) {
        favoriteFilms = favoriteFilms.filter(
          (f: Film) => f.episode_id !== film?.episode_id,
        );
      } else {
        favoriteFilms.push(film as Film);
      }

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteFilms));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilm();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color={COLORS.text}
          style={{ marginTop: 50 }}
        />
      </View>
    );
  }

  if (!film) {
    return (
      <View style={styles.container}>
        <Text>Film not found...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={COLORS.text}
        />
      }
    >
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={toggleFavorite}>
              <Ionicons
                name={isFavorite ? 'star' : 'star-outline'}
                size={24}
                color={COLORS.text}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Text style={styles.title}>{film.title}</Text>
      <Text style={styles.description}>Directopr: {film.director}</Text>
      <Text style={styles.description}>Producer: {film.producer}</Text>
      <Text style={styles.description}>Released: {film.release_date}</Text>
      <Text style={styles.crawl}>{film.opening_crawl}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.containerBackground,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: 'normal',
    marginBottom: 8,
  },
  crawl: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: 'normal',
    marginTop: 20,
    marginBottom: 8,
    fontStyle: 'italic',
  },
});

export default Details;
