import { COLORS } from '@/constants/colors';
import { Film } from '@/types/films';
import { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { FilmCard } from '@/components/film-card';
import { EmptyListComponent } from '@/components/empty-list-component';
import { useFilmsStore } from '@/zustand/films-store';

export default function Films() {
  const { films, loading, fetchFilms } = useFilmsStore();
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = ({ item }: { item: Film }) => <FilmCard film={item} />;
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFilms();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={films}
        keyExtractor={({ episode_id }) => episode_id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.text}
          />
        }
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
