import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

const LeaderboardItem = ({ item, index }) => {
  return (
    <View className='flex-row justify-between items-center p-4 bg-gray-100 border-b border-gray-200 mt-2 rounded-2xl'>
      <View className='flex-row'>
        <Text className='text-lg font-bold'>{index + 1}. </Text>
        <Text className='text-lg font-bold'>{item.first_name}</Text>
      </View>

      <View className='flex-row bg-zinc-800 rounded-xl px-2 py-1'>
        <FontAwesome6 name="gripfire" size={24} color="white" />
        <Text className='text-l mt-1 ml-2 font-bold text-white'>{item.login_streak}</Text>
      </View>
    </View>
  );
};

export default LeaderboardItem;