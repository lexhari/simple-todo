import React from 'react'
import { View, Text, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

function TodoItem({ text = "Sample todo item", completed = false, onDelete }) {
    return (
        <View className="flex flex-row items-center justify-between bg-white p-4 rounded-lg mb-2 shadow-sm">
            <Text className={`flex-1 ${completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {text}
            </Text>
        </View>
    )
}

export default TodoItem