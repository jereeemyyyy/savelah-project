import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase';
import { format } from 'date-fns';

  const formatDate = (date) => format(date, 'yyyy-MM-dd');

  const updateLoginStreak = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_logins')
        .select('last_login_date, login_streak')
        .eq('user_id', userId)
        .single();
  
      if (error && error.code !== 'PGRST116') {
        // Handle other errors
        throw error;
      }
  
      const today = new Date();
      const todayStr = formatDate(today);
  
      if (data) {
        const { last_login_date, login_streak } = data;
        const lastLoginDate = new Date(last_login_date);
        const differenceInDays = Math.floor((today - lastLoginDate) / (1000 * 60 * 60 * 24));
  
        if (differenceInDays === 1) {
          // Last login was yesterday, increase streak
          await supabase
            .from('user_logins')
            .update({ last_login_date: todayStr, login_streak: login_streak + 1 })
            .eq('user_id', userId);
        } else if (differenceInDays > 1) {
          // Last login was two or more days ago, reset streak
          await supabase
            .from('user_logins')
            .update({ last_login_date: todayStr, login_streak: 1 })
            .eq('user_id', userId);
        }
        // If differenceInDays === 0, do nothing (already logged in today)
      } else {
        // No previous login record, create a new one
        await supabase
          .from('user_logins')
          .insert({ user_id: userId, last_login_date: todayStr, login_streak: 1 });
      }
    } catch (error) {
      console.error('Error updating login streak:', error.message);
    }
  };



export default function LeaderBoardsScreen() {

    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
        try {
            const { data, error } = await supabase
            .from('user_logins') 
            .select('*') 
            .order('login_streak', { ascending: false }); // Order by score in descending order

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

    const renderItem = ({ item }) => (
        <View className='flex-row justify-between 
                         items-center p-4 bg-gray-100
                         border-b border-gray-200 mt-2
                         rounded-2xl'>
            <View className='flex-row'>
                <Text className='text-lg font-bold'>{item.user_id}. </Text>
                <Text className='text-lg font-bold'>{item.first_name}</Text>
            </View>

            <View className='flex-row bg-zinc-800 rounded-xl px-2 py-1'>
                <FontAwesome6 name="gripfire" size={24} color="white" />
                <Text className='text-l mt-1 ml-2 font-bold text-white'>{item.login_streak}</Text>
            </View>
            
        </View>
      );


      // If loading, display a loading indicator
      if (loading) {
        return (
          <View className='flex-1 bg-gray-800 justify-center items-center'>
            <Text className='text-white'>Loading...</Text>
          </View>
        );
      }
    
      return (
        <View className='flex-1 bg-gray-800'>
          <Text className='text-3xl font-bold p-4 text-left text-white'>
            Leaderboards
          </Text>
          <FlatList
            data={leaderboardData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
      );
}
    
