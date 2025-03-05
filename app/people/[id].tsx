import { FilmsApi } from '@/api/films';
import { PeopleApi } from '@/api/people';
import { COLORS } from '@/constants/colors';
import { extractIdFromUrl } from '@/helpers/extractIdFromUrl';
import { Film } from '@/types/films';
import { Person } from '@/types/people';
import { Starship } from '@/types/starships';
import { Vehicle } from '@/types/vehicles';
import { useLocalSearchParams } from 'expo-router';
import { FC, useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

const PersonInfo: FC = () => {
  const { id } = useLocalSearchParams();
  const [person, setPerson] = useState<Person | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState(true);

  const getPerson = async () => {
    try {
      const person = await PeopleApi.getPerson(id as string);

      setPerson(person);

      getPersonFilms(person);
      getPersonVehicles(person);
      getPersonStarships(person);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getPersonFilms = async (person: Person) => {
    try {
      const films = await Promise.all(
        person.films.map((film) => FilmsApi.getFilm(extractIdFromUrl(film))),
      );
      setFilms(films);
    } catch (error) {
      console.log(error);
    }
  };

  const getPersonVehicles = async (person: Person) => {
    try {
      const vehicles = await Promise.all(
        person.vehicles.map((vehicle) =>
          PeopleApi.getPersonVehicles(extractIdFromUrl(vehicle)),
        ),
      );
      setVehicles(vehicles);
    } catch (error) {
      console.log(error);
    }
  };

  const getPersonStarships = async (person: Person) => {
    try {
      const starships = await Promise.all(
        person.starships.map((starship) =>
          PeopleApi.getPersonStarships(extractIdFromUrl(starship)),
        ),
      );
      setStarships(starships);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPerson();
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

  if (!person) {
    return (
      <View style={styles.container}>
        <Text>Film not found...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{person.name}</Text>
      <Text style={styles.label}>
        Birth:
        <Text style={styles.info}> {person.birth_year}</Text>
      </Text>
      <Text style={styles.label}>
        Gender:
        <Text style={{ ...styles.info, textTransform: 'capitalize' }}>
          {' '}
          {person.gender}
        </Text>
      </Text>
      <Text style={styles.label}>
        Heigth:
        <Text style={styles.info}> {person.height} sm</Text>
      </Text>
      <Text style={styles.label}>
        Mass:
        <Text style={styles.info}> {person.mass} kg</Text>
      </Text>
      <Text style={styles.label}>
        Skin color:
        <Text style={{ ...styles.info, textTransform: 'capitalize' }}>
          {' '}
          {person.skin_color}
        </Text>
      </Text>
      <Text style={styles.label}>
        Eye color:
        <Text style={{ ...styles.info, textTransform: 'capitalize' }}>
          {' '}
          {person.eye_color}
        </Text>
      </Text>
      <View style={styles.list}>
        <Text style={styles.info}>Films</Text>
        <FlatList
          data={films}
          keyExtractor={(item) => item.episode_id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.film}>{item.title}</Text>
          )}
        />
      </View>
      {vehicles.length ? (
        <View style={styles.list}>
          <Text style={styles.info}>Vehicles</Text>
          <FlatList
            data={vehicles}
            keyExtractor={(item) => item.name.toString()}
            renderItem={({ item }) => (
              <Text style={styles.film}>{item.name}</Text>
            )}
          />
        </View>
      ) : null}
      {starships.length ? (
        <View style={styles.list}>
          <Text style={styles.info}>Starships</Text>
          <FlatList
            data={starships}
            keyExtractor={(item) => item.name.toString()}
            renderItem={({ item }) => (
              <Text style={styles.film}>{item.name}</Text>
            )}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  info: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  label: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 6,
  },
  list: {
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  film: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default PersonInfo;
