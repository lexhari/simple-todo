import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, TextInput, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import TodoItem from '../components/todo-item';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import FontDemo from '../components/font-demo';
import { useTodoStore } from '../store/todoStore';

const Index: React.FC = () => {
    const { todos } = useTodoStore();

    const currentDate: Date = new Date();
    const formattedDate: string = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <View className="flex gap-4 px-4 py-4">
            {/* <FontDemo /> */}
            <View className="flex flex-row justify-between items-center">
                <Text className="font-darker-grotesque-bold text-4xl">Today's To Do</Text>
                <Text className="font-darker-grotesque-medium text-xl">{formattedDate}</Text>
            </View>
            <View className="">
                {todos.length > 0 ? (
                    <FlatList
                        data={todos}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <TodoItem todo={item} />}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <View className="py-8 items-center">
                        <Text className="text-gray-500 text-xl font-darker-grotesque-medium">
                            No todos yet. Add one using the + button!
                        </Text>
                    </View>
                )}
            </View>

            
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({});