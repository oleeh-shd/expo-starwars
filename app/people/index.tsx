import { COLORS } from '@/constants/colors';
import { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { EmptyListComponent } from '@/components/empty-list-component';
import { Person } from '@/types/people';
import { PeopleApi } from '@/api/people';
import { extractIdFromUrl } from '@/helpers/extractIdFromUrl';
import { PersonCard } from '@/components/person-card';

export default function People() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [next, setNext] = useState<string | null>(null);
  const isFirstLoad = useRef(true);

  const getPeople = async () => {
    try {
      const people = next
        ? await PeopleApi.next(next)
        : await PeopleApi.getPeople();
      setPeople((prevPeople) => [...prevPeople, ...people.results]);
      setNext(people.next);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPeople();
  }, []);

  const renderItem = ({ item }: { item: Person }) => (
    <PersonCard person={item} />
  );
  const onRefresh = async () => {
    setRefreshing(true);
    await getPeople();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={people}
        keyExtractor={({ url }) => extractIdFromUrl(url)}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.text}
          />
        }
        ListEmptyComponent={<EmptyListComponent loading={loading} />}
        onEndReached={() => {
          if (!isFirstLoad.current && next) {
            getPeople();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && !isFirstLoad.current ? (
            <ActivityIndicator size="large" />
          ) : null
        }
        onScroll={() => (isFirstLoad.current = false)}
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
