import React from 'react'
import { View, Text } from 'react-native'

const WeekView: React.FC = () => {
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-lg font-bold mb-4">Week View</Text>
      <View className="bg-white rounded-lg shadow p-4">
        <Text className="text-gray-700">This is the week view component.</Text>
      </View>
    </View>
  )
}

export default WeekView