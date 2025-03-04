import { COLORS } from '@/constants/colors';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'All Films' }} />
      <Stack.Screen name="[id]" options={{ title: 'Film details' }} />
    </Stack>
  );
};

export default Layout;
