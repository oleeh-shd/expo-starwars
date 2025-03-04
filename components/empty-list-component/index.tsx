import { COLORS } from '@/constants/colors';
import { FC } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type Props = {
  loading?: boolean;
  message?: string;
};

export const EmptyListComponent: FC<Props> = ({ loading, message = 'No items found' }) => {
  return (
    <View style={styles.emptyContainer}>
      {loading ? <ActivityIndicator size="large" color={COLORS.text} /> : <Text style={styles.text}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  text: {
    fontSize: 18,
    color: COLORS.inactive,
  },
});
