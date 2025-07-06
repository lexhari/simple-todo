import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import TodoItem from '../components/todo-item';

const Index: React.FC = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [todoText, setTodoText] = useState<string>('');
    const [todoDescription, setTodoDescription] = useState<string>('');
    
    const currentDate: Date = new Date();
    const formattedDate: string = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <View className="px-4 py-8">
            <View className="flex flex-row justify-between">
                <Text>Today</Text>
                <Text>{formattedDate}</Text>
            </View>
            <View className="flex flex-row justify-between">
                <Text>
                    To Do
                </Text>
                <Pressable
                    className="bg-blue-500 p-2 rounded-full"
                    onPress={() => setModalVisible(true)}
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
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="w-screen h-screen bg-white">
                    <View>
                        <Pressable
                            className="p-4 rounded-full"
                            onPress={() => setModalVisible(false)}
                            accessibilityLabel='Close modal'
                        >
                            <Ionicons name="close" size={24} color="black" />
                        </Pressable>
                        <Text className="text-lg font-bold">Create To-do</Text>
                    </View>
                    <View>
                        <TextInput
                            onChangeText={(text: string) => setTodoText(text)}
                            value={todoText}
                            placeholder="Add a new todo item"
                            keyboardType="default"
                        />
                        <TextInput
                            onChangeText={(text: string) => setTodoDescription(text)}
                            value={todoDescription}
                            placeholder="Add a description"
                            keyboardType="default"
                        />
                        <View>
                            <Text>Set Due Date</Text>

                        </View>
                    </View>
                    <Pressable>
                        <Text>Create</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({});