// Navigation Tabs Component
import React from 'react';
import { useState } from 'react';
import { View, Text, Pressable, Modal, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import { useTodoStore } from '../store/todoStore';

const Tabs: React.FC = () => {
    const [addTodoVisible, setAddTodoVisible] = useState<boolean>(false);
    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
    const [todoText, setTodoText] = useState<string>('');
    const [todoDescription, setTodoDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('Work');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

    const defaultStyles = useDefaultStyles();
    const [selected, setSelected] = useState<DateType>();

    const { addTodo } = useTodoStore();

    const router = useRouter();
    const pathname = usePathname();
    const insets = useSafeAreaInsets();

    const handleNavigation = (route: string): void => {
        if (pathname !== route) {
            router.replace(route);
        }
    };

    const handleCreateTodo = () => {
        if (todoText.trim()) {
            addTodo({
                text: todoText.trim(),
                description: todoDescription.trim() || undefined,
                category,
                priority,
                dueDate: selected ? (typeof selected === 'object' && 'toDate' in selected ? selected.toDate() : new Date(selected)) : undefined,
                completed: false
            });

            // Reset form
            setTodoText('');
            setTodoDescription('');
            setCategory('Work');
            setPriority('medium');
            setSelected(undefined);
            setAddTodoVisible(false);
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
                <View className="h-full bg-gray-50 p-6 gap-3">
                    <View className="flex-row justify-between items-center">
                        <View>
                            <Text className="text-4xl font-darker-grotesque-bold text-gray-900">Create To-do</Text>
                            <Text className="text-gray-500 font-dm-sans">Add a new task to your list</Text>
                        </View>
                        <Pressable
                            className="p-3 bg-gray-100 rounded-full"
                            onPress={() => setAddTodoVisible(false)}
                            accessibilityLabel='Close modal'
                        >
                            <Ionicons name="close" size={24} color="#6B7280" />
                        </Pressable>
                    </View>
                    
                    <View className="flex-1 gap-4">
                        {/* Task Title */}
                        <View>
                            <Text className="text-lg font-darker-grotesque-bold text-gray-700 mb-2">Task Title</Text>
                            <View className="bg-white rounded-2xl border border-gray-200 shadow-xs">
                                <TextInput
                                    className="text-base p-4 text-gray-900 font-dm-sans"
                                    onChangeText={setTodoText}
                                    value={todoText}
                                    placeholder="What needs to be done?"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="default"
                                />
                            </View>
                        </View>
                        
                        {/* Description */}
                        <View>
                            <Text className="text-lg font-darker-grotesque-bold text-gray-700 mb-2">Description</Text>
                            <View className="bg-white rounded-2xl border border-gray-200 shadow-xs">
                                <TextInput
                                    className="text-base p-4 text-gray-900 min-h-[80px] font-dm-sans"
                                    onChangeText={setTodoDescription}
                                    value={todoDescription}
                                    placeholder="Add more details about your task..."
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="default"
                                    multiline
                                    textAlignVertical="top"
                                />
                            </View>
                        </View>

                        {/* Category Selection */}
                        <View>
                            <Text className="text-lg font-darker-grotesque-bold text-gray-700 mb-2">Category</Text>
                            <View className="flex-row flex-wrap justify-between">
                                {[
                                    { name: 'Work', icon: 'briefcase', color: 'bg-blue-500' },
                                    { name: 'Personal', icon: 'person', color: 'bg-purple-500' },
                                    { name: 'Health', icon: 'fitness', color: 'bg-green-500' },
                                    { name: 'Learning', icon: 'library', color: 'bg-orange-500' }
                                ].map((cat) => (
                                    <Pressable
                                        key={cat.name}
                                        className={`font-dm-sans px-4 py-3 rounded-2xl flex-row items-center gap-2 shadow-xs ${category === cat.name ? cat.color : 'bg-white border border-gray-200'}`}
                                        onPress={() => setCategory(cat.name)}
                                    >
                                        <Ionicons 
                                            name={cat.icon as any} 
                                            size={16} 
                                            color={category === cat.name ? 'white' : '#6B7280'} 
                                        />
                                        <Text className={`font-dm-sans-medium text-sm ${category === cat.name ? 'text-white' : 'text-gray-700'}`}>
                                            {cat.name}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>

                        {/* Priority Selection */}
                        <View>
                            <Text className="text-lg font-darker-grotesque-bold text-gray-700 mb-2">Priority Level</Text>
                            <View className="flex-row gap-3">
                                {[
                                    { value: 'low', label: 'Low', color: 'bg-green-500', icon: 'chevron-down' },
                                    { value: 'medium', label: 'Medium', color: 'bg-yellow-500', icon: 'remove' },
                                    { value: 'high', label: 'High', color: 'bg-red-500', icon: 'chevron-up' }
                                ].map((p) => (
                                    <Pressable
                                        key={p.value}
                                        className={`flex-1 px-4 py-3 rounded-2xl flex-row items-center justify-center gap-2 shadow-xs ${priority === p.value ? p.color : 'bg-white border border-gray-200'}`}
                                        onPress={() => setPriority(p.value as 'low' | 'medium' | 'high')}
                                    >
                                        <Ionicons 
                                            name={p.icon as any} 
                                            size={16} 
                                            color={priority === p.value ? 'white' : '#6B7280'} 
                                        />
                                        <Text className={`font-dm-sans-medium text-sm ${priority === p.value ? 'text-white' : 'text-gray-700'}`}>
                                            {p.label}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>

                        {/* Due Date */}
                        <View>
                            <Text className="text-lg font-darker-grotesque-bold text-gray-700 mb-2">Due Date</Text>
                            <Pressable
                                className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4 flex-row items-center justify-between"
                                onPress={() => setDatePickerVisible(true)}
                                accessibilityLabel='Select due date'
                            >
                                <View className="flex-row items-center gap-3">
                                    <Ionicons name="calendar-outline" size={20} color="#6B7280" />
                                    <Text className={`font-dm-sans text-base ${selected ? 'text-gray-900' : 'text-gray-500'}`}>
                                        {selected ? (typeof selected === 'object' && 'format' in selected ? selected.format('MM/DD/YYYY') : new Date(selected).toLocaleDateString()) : 'Select Due Date'}
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                            </Pressable>
                        </View>
                    </View>
                    
                    <View className="">
                        <Pressable 
                            className={`p-4 rounded-2xl shadow-lg ${todoText.trim() ? 'bg-blue-600' : 'bg-gray-300'}`}
                            onPress={handleCreateTodo}
                            disabled={!todoText.trim()}
                        >
                            <View className="flex-row items-center justify-center gap-2">
                                <Ionicons 
                                    name="add-circle" 
                                    size={20} 
                                    color={todoText.trim() ? 'white' : '#9CA3AF'} 
                                />
                                <Text className={`text-center text-lg font-semibold ${todoText.trim() ? 'text-white' : 'text-gray-500'}`}>
                                    Create Todo
                                </Text>
                            </View>
                        </Pressable>
                    </View>
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