import React, { useMemo } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useTodoStore, Todo } from '../store/todoStore'

const WeekView: React.FC = () => {
  const { todos } = useTodoStore()

  // Get the current week's Monday
  const getCurrentWeekMonday = () => {
    const today = new Date()
    const day = today.getDay()
    const diff = today.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
    return new Date(today.setDate(diff))
  }

  // Generate the 7 days of the current week starting from Monday
  const weekDays = useMemo(() => {
    const monday = getCurrentWeekMonday()
    const days = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      days.push(date)
    }

    return days
  }, [])

  // Organize todos by their due dates
  const todosByDay = useMemo(() => {
    const result: { [key: string]: Todo[] } = {}

    // Initialize each day with empty array
    weekDays.forEach(day => {
      const dayKey = day.toDateString()
      result[dayKey] = []
    })

    // Group todos by their due date
    todos.forEach(todo => {
      if (todo.dueDate) {
        const dueDate = new Date(todo.dueDate)
        const dayKey = dueDate.toDateString()

        // Only include todos that fall within this week
        if (result[dayKey] !== undefined) {
          result[dayKey].push(todo)
        }
      }
    })

    // Sort todos within each day by creation date (newest first)
    Object.keys(result).forEach(dayKey => {
      result[dayKey].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    })

    return result
  }, [todos, weekDays])

  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' })
  }

  const getDateFormatted = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex flex-row px-4 py-4 bg-gray-50 justify-between items-center">
        <Text className="font-darker-grotesque-bold text-4xl">Week View</Text>
        <Text className="font-darker-grotesque-medium text-xl">
          {weekDays[0]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekDays[6]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 10 }}>
        <View className="px-4">
          {weekDays.map((day, index) => {
            const dayKey = day.toDateString()
            const dayTodos = todosByDay[dayKey] || []
            const isCurrentDay = isToday(day)

            return (
              <View key={dayKey} className="flex-row mb-4">
                {/* Left */}
                <View className="w-20 pt-2">
                  <Text className={`text-sm font-semibold ${isCurrentDay ? 'text-blue-600' : 'text-gray-700'
                    } font-dm-sans-semibold`}>
                    {getDayName(day)}
                  </Text>
                  <Text className="text-xs text-gray-400 font-dm-sans-regular">
                    {getDateFormatted(day)}
                  </Text>
                </View>

                {/* Right */}
                <View className="flex-1">
                  {dayTodos.length > 0 ? (
                    <View className="gap-2">
                      {dayTodos.map((todo) => (
                        <View key={todo.id} className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                          <View className="flex-row items-center justify-between">
                            <View className="flex-1">
                              <Text className={`text-sm font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
                                } font-dm-sans-medium`}>
                                {todo.text}
                              </Text>
                              {todo.description && (
                                <Text className="text-xs text-gray-600 mt-1 font-dm-sans-regular">
                                  {todo.description}
                                </Text>
                              )}
                              <View className="flex-row items-center gap-2 mt-1">
                                <View className="py-1 px-3 rounded-full bg-blue-100">
                                  <Text className="text-xs text-blue-800 font-dm-sans-medium">
                                    {todo.category}
                                  </Text>
                                </View>
                                <View className={`px-2 py-1 rounded ${todo.priority === 'high' ? 'bg-red-50' :
                                  todo.priority === 'medium' ? 'bg-yellow-50' : 'bg-green-50'
                                  }`}>
                                  <Text className={`text-xs font-dm-sans-medium ${todo.priority === 'high' ? 'text-red-700' :
                                    todo.priority === 'medium' ? 'text-yellow-700' : 'text-green-700'
                                    }`}>
                                    {todo.priority}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <View className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <Text className="text-xs text-gray-400 font-dm-sans-regular">
                        No tasks
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

export default WeekView