import { COLORS } from '@/constants/colors';
import { extractIdFromUrl } from '@/helpers/extractIdFromUrl';
import { Person } from '@/types/people';
import { Link } from 'expo-router';
import { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  person: Person;
};

export const PersonCard: FC<Props> = ({ person }) => {
  const id = extractIdFromUrl(person.url);
  return (
    <Link href={`/people/${id}`} asChild>
      <TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.title}>{person.name}</Text>
          <Text style={styles.subText}>
            Birth:
            <Text style={styles.text}> {person.birth_year}</Text>
          </Text>
          <Text style={styles.subText}>
            Gender:
            <Text style={styles.text}> {person.gender}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.itemBackground,
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    gap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subText: {
    fontSize: 14,
    color: '#fff',
  },
});
