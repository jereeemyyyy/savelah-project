import React, { useState, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { supabase } from '../../../../lib/supabase';
import LeaderboardItem from './LeaderBoardItem';

const LeaderboardList = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const { data, error } = await supabase
          .from('user_logins')
          .select('*')
          .order('login_streak', { ascending: false });

        if (error) {
          throw new Error('Error fetching leaderboard data');
        }

        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  if (loading) {
    return (
      <View className='flex-1 bg-gray-800 justify-center items-center'>
        <Text className='text-white'>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={leaderboardData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => <LeaderboardItem item={item} index={index} />}
    />
  );
};

export default LeaderboardList;