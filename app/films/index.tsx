import { COLORS } from '@/constants/colors';
import { Film } from '@/types/films';
import { FilmsApi } from '@/api/films';
import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { FilmCard } from '@/components/film-card';
import { EmptyListComponent } from '@/components/empty-list-component';

export default function Films() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getFilms = async () => {
    try {
      const films = await FilmsApi.getFilms();
      setFilms(films.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFilms();
  }, []);

  const renderItem = ({ item }: { item: Film }) => <FilmCard film={item} />;
  const onRefresh = async () => {
    setRefreshing(true);
    await getFilms();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={films}
        keyExtractor={({ episode_id }) => episode_id.toString()}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.text} />}
        ListEmptyComponent={<EmptyListComponent loading={loading} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.containerBackground,
    justifyContent: 'center',
  },
});
