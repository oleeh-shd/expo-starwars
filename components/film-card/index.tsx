import { COLORS } from '@/constants/colors';
import { extractIdFromUrl } from '@/helpers/extractIdFromUrl';
import { Film } from '@/types/films';
import { Link } from 'expo-router';
import { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = { film: Film };

export const FilmCard: FC<Props> = ({ film }) => {
  const id = extractIdFromUrl(film.url);
  return (
    <Link href={`/films/${id}`} asChild>
      <TouchableOpacity>
        <View style={styles.item}>
          <Text style={styles.title}>
            Title: <Text style={styles.title}>{film.title}</Text>
          </Text>
          <Text style={styles.subTitle}>Director: {film.director}</Text>
          <Text style={styles.subTitle}>Released: {film.release_date}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: COLORS.itemBackground,
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    gap: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subTitle: {
    fontSize: 14,
    color: '#fff',
  },
});
