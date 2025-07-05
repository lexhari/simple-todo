import { Stack } from 'expo-router';
import "../global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Simple Todo",
          headerStyle: { backgroundColor: '#f4f4f4' },
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
    </Stack>
  );
}
