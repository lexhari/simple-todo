import React from 'react';
import { View, Text } from 'react-native';

export default function FontDemo() {
  return (
    <View className="p-4 space-y-2">
      <Text className="text-lg font-dm-sans-bold">Font Weight Examples:</Text>
      
      {/* DM Sans fonts with different weights */}
      <Text className="font-dm-sans-light text-base">DM Sans Light</Text>
      <Text className="font-dm-sans text-base">DM Sans Regular</Text>
      <Text className="font-dm-sans-medium text-base">DM Sans Medium</Text>
      <Text className="font-dm-sans-semibold text-base">DM Sans Semibold</Text>
      <Text className="font-dm-sans-bold text-base">DM Sans Bold</Text>
      
      {/* Darker Grotesque fonts with different weights */}
      <Text className="font-darker-grotesque text-base">Darker Grotesque Regular</Text>
      <Text className="font-darker-grotesque-medium text-base">Darker Grotesque Medium</Text>
      <Text className="font-darker-grotesque-semibold text-base">Darker Grotesque Semibold</Text>
      <Text className="font-darker-grotesque-bold text-base">Darker Grotesque Bold</Text>
      <Text className="font-darker-grotesque-extrabold text-base">Darker Grotesque Extra Bold</Text>
      
      {/* Default sans font (which is set to DM Sans Regular) */}
      <Text className="font-sans text-base mt-4">Default Sans Font (DM Sans Regular)</Text>
    </View>
  );
}
