import React from 'react'
import { View, Text, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { TodoItemProps } from '../types/todo'

function TodoItem({ text = "Sample todo item", completed = false, onDelete }: TodoItemProps) {
    return (
        <View className="bg-white rounded-xl gap-2 p-4 mb-3 border border-gray-100 shadow-sm">
            {/* Header: Category and Actions */}
            <View className="flex flex-row justify-between items-start">
                <View className="py-1 px-3 rounded-full bg-blue-100">
                    <Text className="text-xs text-blue-800 font-dm-sans-medium">
                        Work
                    </Text>
                </View>
                <View className="flex flex-row gap-2">
                    <Pressable className="p-1">
                        <Ionicons name="checkmark-circle-outline" size={20} color={completed ? "#10b981" : "#d1d5db"} />
                    </Pressable>
                    <Pressable onPress={onDelete} className="p-1">
                        <Ionicons name="trash-outline" size={18} color="#ef4444" />
                    </Pressable>
                </View>
            </View>

            {/* Main Content */}
            <View>
                <Text className={`text-base font-dm-sans-medium ${completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {text}
                </Text>
                <Text className="text-sm text-gray-600 font-dm-sans-regular">
                    Review quarterly reports and prepare presentation for stakeholders meeting
                </Text>
            </View>

            {/* Footer: Due Date and Priority */}
            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row items-center gap-1">
                    <Ionicons name="time-outline" size={14} color="#6b7280" />
                    <Text className="text-xs text-gray-500 font-dm-sans-regular">
                        Due: Jul 10, 10:00 PM
                    </Text>
                </View>
                <View className="flex flex-row items-center gap-2">
                    <View className="py-1 px-2 rounded-md bg-red-50">
                        <Text className="text-xs text-red-700 font-dm-sans-medium">
                            High
                        </Text>
                    </View>
                    <View className="w-2 h-2 rounded-full bg-red-500"></View>
                </View>
            </View>
        </View>
    )
}

export default TodoItem