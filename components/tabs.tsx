// Navigation Tabs Component
import React from 'react';
import { useState } from 'react';
import { View, Text, Pressable, Modal, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';

const Tabs: React.FC = () => {
    const [addTodoVisible, setAddTodoVisible] = useState<boolean>(false);
    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
    const [todoText, setTodoText] = useState<string>('');
    const [todoDescription, setTodoDescription] = useState<string>('');

    const defaultStyles = useDefaultStyles();
    const [selected, setSelected] = useState<DateType>();

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
                <Pressable
                    className='w-1/3 flex items-center'
                    onPress={() => handleNavigation('/')} accessibilityLabel='Go to Home'>
                    <Ionicons name="list-outline" size={24} color="black" />
                    <Text className="text-xs text-gray-600">Home</Text>
                </Pressable>
                <Pressable
                    className="bg-black flex flex-row gap-2 items-center py-2 px-4 rounded-full"
                    onPress={() => setAddTodoVisible(true)}
                    accessibilityLabel='Add a new todo item'
                >
                    <Ionicons name="add" size={15} color="white" />
                </Pressable>
                <Pressable
                    className='w-1/3 flex items-center'
                    onPress={() => handleNavigation('/week')} accessibilityLabel='Go to Settings'>
                    <MaterialIcons name="view-week" size={24} color="black" />
                    <Text className="text-xs text-gray-600">Week</Text>
                </Pressable>

            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={addTodoVisible}
                onRequestClose={() => setAddTodoVisible(false)}
            >
                <View className="w-screen h-screen bg-white">
                    <View>
                        <Pressable
                            className="p-4 rounded-full"
                            onPress={() => setAddTodoVisible(false)}
                            accessibilityLabel='Close modal'
                        >
                            <Ionicons name="close" size={24} color="black" />
                        </Pressable>
                        <Text className="text-2xl">Create To-do</Text>
                    </View>
                    <View>
                        <TextInput
                            className="text-base p-3 border border-gray-300 rounded-lg"
                            onChangeText={(text: string) => setTodoText(text)}
                            value={todoText}
                            placeholder="Add a new todo item"
                            keyboardType="default"
                        />
                        <TextInput
                            className="text-base p-3 border border-gray-300 rounded-lg"
                            onChangeText={(text: string) => setTodoDescription(text)}
                            value={todoDescription}
                            placeholder="Add a description"
                            keyboardType="default"
                        />
                        <View>
                            <Pressable
                                className="bg-blue-500 p-2 rounded-full"
                                onPress={() => setDatePickerVisible(true)}
                                accessibilityLabel='Select due date'
                            >
                                <Text className="text-white">
                                    {selected ? (typeof selected === 'object' && 'format' in selected ? selected.format('MM/DD/YYYY') : new Date(selected).toLocaleDateString()) : 'Select Due Date'}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    <Pressable className="bg-blue-500 p-4 rounded-lg">
                        <Text className="text-white text-center text-lg">Create</Text>
                    </Pressable>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={datePickerVisible}
                onRequestClose={() => setDatePickerVisible(false)}
            >
                <View className="flex-1 justify-end">
                    <View className="bg-white rounded-t-3xl p-6">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-xl">Select Due Date</Text>
                            <Pressable
                                onPress={() => setDatePickerVisible(false)}
                                accessibilityLabel='Close date picker'
                            >
                                <Ionicons name="close" size={24} color="black" />
                            </Pressable>
                        </View>
                        <DateTimePicker
                            mode="single"
                            date={selected}
                            onChange={({ date }) => {
                                setSelected(date);
                                setDatePickerVisible(false);
                            }}
                            styles={defaultStyles}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default Tabs;