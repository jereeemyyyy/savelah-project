import React from 'react';
import { View, Text } from 'react-native';
import LeaderboardList from './components/LeaderBoardList';

const LeaderboardScreen = () => {


  return (
    <View className='flex-1 bg-gray-800'>
      <Text className='text-3xl font-bold p-4 text-left text-white' testID='leaderboards'>
        Leaderboards
      </Text>
      <LeaderboardList />
    </View>
  );
};

export default LeaderboardScreen;