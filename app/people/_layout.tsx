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
      <Stack.Screen name="index" options={{ title: 'People' }} />
      <Stack.Screen name="[id]" options={{ title: 'Person details' }} />
    </Stack>
  );
};

export default Layout;
