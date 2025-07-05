import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Tabs from '../components/tabs';
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="week" 
          options={{ 
            headerShown: false
          }} 
        />
      </Stack>
      <Tabs />
    </SafeAreaView>
  );
}
