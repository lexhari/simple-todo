import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import TodoItem from '../components/todo-item';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import FontDemo from '../components/font-demo';

const Index: React.FC = () => {
    const [addTodoVisible, setAddTodoVisible] = useState<boolean>(false);
    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
    const [todoText, setTodoText] = useState<string>('');
    const [todoDescription, setTodoDescription] = useState<string>('');

    const defaultStyles = useDefaultStyles();
    const [selected, setSelected] = useState<DateType>();

    const currentDate: Date = new Date();
    const formattedDate: string = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <View className="px-4 py-8">
            <FontDemo />
            <View className="flex flex-row justify-between items-center mb-4">
                <Text className="font-darker-grotesque-bold text-2xl">Today</Text>
                <Text className="font-dm-sans-medium text-gray-600">{formattedDate}</Text>
            </View>
            <View className="flex flex-row justify-between items-center mb-4">
                <Text className="font-darker-grotesque-bold text-xl">
                    To Do
                </Text>
                <Pressable
                    className="bg-blue-500 p-2 rounded-full"
                    onPress={() => setAddTodoVisible(true)}
                    accessibilityLabel='Add a new todo item'
                >
                    <Ionicons name="add" size={20} color="white" />
                </Pressable>
            </View>
            <View className="mt-4">
                <TodoItem text="Learn React Native" completed={false} />
                <TodoItem text="Build a todo app" completed={true} />
                <TodoItem text="Practice with Expo Router" completed={false} />
                <TodoItem text="Style with NativeWind" completed={false} />
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
                        <Text className="font-darker-grotesque-bold text-2xl mb-4">Create To-do</Text>
                    </View>
                    <View>
                        <TextInput
                            className="font-dm-sans text-base p-3 border border-gray-300 rounded-lg mb-4"
                            onChangeText={(text: string) => setTodoText(text)}
                            value={todoText}
                            placeholder="Add a new todo item"
                            keyboardType="default"
                        />
                        <TextInput
                            className="font-dm-sans text-base p-3 border border-gray-300 rounded-lg mb-4"
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
                                <Text className="font-dm-sans-medium text-white">
                                    {selected ? (typeof selected === 'object' && 'format' in selected ? selected.format('MM/DD/YYYY') : new Date(selected).toLocaleDateString()) : 'Select Due Date'}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    <Pressable className="bg-blue-500 p-4 rounded-lg">
                        <Text className="font-dm-sans-semibold text-white text-center text-lg">Create</Text>
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
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="font-darker-grotesque-bold text-xl">Select Due Date</Text>
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
};

export default Index;

const styles = StyleSheet.create({});