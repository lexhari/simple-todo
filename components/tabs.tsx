// Navigation Tabs Component
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tabs: React.FC = () => {
    const router = useRouter();  
    const pathname = usePathname();
    const insets = useSafeAreaInsets();

    const handleNavigation = (route: string): void => {
        if (pathname !== route) {
            router.replace(route);
        }
    };

    return (
        <View style={{ paddingBottom: insets.bottom }} className="bg-white border-t border-gray-200">
            <View className="flex flex-row justify-around items-center p-4">
                <Pressable onPress={() => handleNavigation('/')} accessibilityLabel='Go to Home'>
                    <Ionicons name="home" size={24} color="black" />
                    <Text className="text-xs text-gray-600">Home</Text>
                </Pressable>
                <Pressable onPress={() => handleNavigation('/week')} accessibilityLabel='Go to Settings'>
                    <MaterialIcons name="view-week" size={24} color="black" />
                    <Text className="text-xs text-gray-600">Week</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Tabs;