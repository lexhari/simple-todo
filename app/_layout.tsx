import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import Tabs from '../components/tabs';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import "../global.css";

export default function RootLayout(): React.JSX.Element {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        // DM Sans fonts
        'DMSans-Light': require('../assets/fonts/DMSans-Light.ttf'),
        'DMSans-Regular': require('../assets/fonts/DMSans-Regular.ttf'),
        'DMSans-Medium': require('../assets/fonts/DMSans-Medium.ttf'),
        'DMSans-SemiBold': require('../assets/fonts/DMSans-SemiBold.ttf'),
        'DMSans-Bold': require('../assets/fonts/DMSans-Bold.ttf'),
        
        // Darker Grotesque fonts
        'DarkerGrotesque-Regular': require('../assets/fonts/DarkerGrotesque-Regular.ttf'),
        'DarkerGrotesque-Medium': require('../assets/fonts/DarkerGrotesque-Medium.ttf'),
        'DarkerGrotesque-SemiBold': require('../assets/fonts/DarkerGrotesque-SemiBold.ttf'),
        'DarkerGrotesque-Bold': require('../assets/fonts/DarkerGrotesque-Bold.ttf'),
        'DarkerGrotesque-ExtraBold': require('../assets/fonts/DarkerGrotesque-ExtraBold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#ffffff' }} />; // Loading placeholder
  }

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
