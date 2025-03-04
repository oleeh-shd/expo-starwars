import { FAVORITES_KEY } from '@/constants';
import { COLORS } from '@/constants/colors';
import { Film } from '@/types/films';
import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteFilmCard } from '@/components/favorite-film-card';

export default function Index() {
  const [favorites, setFavorites] = useState<Film[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const getFavorites = async () => {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      setFavorites(JSON.parse(favorites || '[]'));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getFavorites();
    setRefreshing(false);
  };

  const onDelete = async (film: Film) => {
    try {
      const newFavorites = favorites.filter(
        (f: Film) => f.episode_id !== film.episode_id,
      );
      setFavorites(newFavorites);

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }: { item: Film }) => (
    <FavoriteFilmCard film={item} onPress={() => onDelete(item)} />
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={({ episode_id }) => episode_id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.text}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.containerBackground,
  },
});
