import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import TodoItem from '../components/todo-item';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import FontDemo from '../components/font-demo';

const Index: React.FC = () => {



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
                <TodoItem text="Learn React Native" completed={false} />
                <TodoItem text="Build a todo app" completed={true} />
                <TodoItem text="Practice with Expo Router" completed={false} />
                <TodoItem text="Style with NativeWind" completed={false} />
            </View>

            
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({});