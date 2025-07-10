import React from 'react'
import { View, Text, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Todo, useTodoStore } from '../store/todoStore'

interface TodoItemProps {
    todo: Todo
}

function TodoItem({ todo }: TodoItemProps) {
    const { deleteTodo, toggleTodo } = useTodoStore()

    // Safety check
    if (!todo) {
        return null;
    }

    const getPriorityColors = (priority: string) => {
        switch (priority) {
            case 'high':
                return { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' }
            case 'medium':
                return { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' }
            case 'low':
                return { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' }
            default:
                return { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-500' }
        }
    }

    const priorityColors = getPriorityColors(todo.priority)

    return (
        <View className="bg-white rounded-xl gap-2 p-4 mb-3 border border-gray-100 shadow-sm">
            {/* Header: Category and Actions */}
            <View className="flex flex-row justify-between items-start">
                <View className="py-1 px-3 rounded-full bg-blue-100">
                    <Text className="text-xs text-blue-800 font-dm-sans-medium">
                        {todo.category}
                    </Text>
                </View>
                <View className="flex flex-row gap-2">
                    <Pressable onPress={() => toggleTodo(todo.id)} className="p-1">
                        <Ionicons name={todo.completed ? "checkmark-circle" : "checkmark-circle-outline"} size={20} color={todo.completed ? "#10b981" : "#d1d5db"}/>
                    </Pressable>
                    <Pressable onPress={() => deleteTodo(todo.id)} className="p-1">
                        <Ionicons name="trash-outline" size={18} color="#ef4444" />
                    </Pressable>
                </View>
            </View>

            {/* Main Content */}
            <View>
                <Text className={`text-base font-dm-sans-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {todo.text}
                </Text>
                {todo.description && (
                    <Text className="text-sm text-gray-600 font-dm-sans-regular mt-1">
                        {todo.description}
                    </Text>
                )}
            </View>

            {/* Footer: Due Date and Priority */}
            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row items-center gap-1">
                    <Ionicons name="time-outline" size={14} color="#6b7280" />
                    <Text className="text-xs text-gray-500 font-dm-sans-regular">
                        {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'No due date'}
                    </Text>
                </View>
                <View className="flex flex-row items-center gap-2">
                    <View className={`py-1 px-2 rounded-md ${priorityColors.bg}`}>
                        <Text className={`text-xs font-dm-sans-medium ${priorityColors.text}`}>
                            {todo.priority}
                        </Text>
                    </View>
                    <View className={`w-2 h-2 rounded-full ${priorityColors.dot}`}></View>
                </View>
            </View>
        </View>
    )
}

export default TodoItem