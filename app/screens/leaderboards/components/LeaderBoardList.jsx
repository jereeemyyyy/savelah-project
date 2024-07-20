import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, TextInput } from 'react-native';
import { supabase } from '../../../../lib/supabase';
import LeaderboardItem from './LeaderBoardItem';

const LeaderboardList = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch leaderboard data and mark the user's position
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

        // Add index to each item
        const dataWithIndex = data.map((item, index) => ({
          ...item,
          index: index + 1, // Start index from 1
        }));

        setLeaderboardData(dataWithIndex);
        setFilteredData(dataWithIndex); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching leaderboard data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  
  useEffect(() => {
    // Filter data based on search query
    if (searchQuery) {
      const filtered = leaderboardData.filter(item =>
        item.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(leaderboardData);
    }
  }, [searchQuery, leaderboardData]);


  if (loading) {
    return (
      <View className='flex-1 bg-gray-800 justify-center items-center'>
        <Text className='text-white'>Loading...</Text>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-gray-800'>
      <TextInput
        className='border border-gray-300 rounded-lg p-3 m-2 text-black bg-white'
        placeholder="Search by username"
        placeholderTextColor="black"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <LeaderboardItem item={item} />}
      />
    </View>
  );
};

export default LeaderboardList;