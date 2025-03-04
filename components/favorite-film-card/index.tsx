import { COLORS } from '@/constants/colors';
import { Film } from '@/types/films';
import { Ionicons } from '@expo/vector-icons';
import { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = { film: Film; onPress: () => void };

export const FavoriteFilmCard: FC<Props> = ({ film, onPress }) => {
  return (
    <View style={styles.item}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Title: <Text style={styles.title}>{film.title}</Text>
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Ionicons name="trash-outline" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>
      <Text style={styles.subTitle}>Director: {film.director}</Text>
      <Text style={styles.subTitle}>Released: {film.release_date}</Text>
    </View>
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
