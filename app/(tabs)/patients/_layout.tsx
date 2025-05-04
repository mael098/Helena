import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';

export default function PatientsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'My Patients',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: 'Patient Details',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: 'Add New Patient',
          headerShadowVisible: false,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}