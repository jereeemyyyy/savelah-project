import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { supabase } from '../../lib/supabase';
import getColour from '../utils/getColour';

const screenWidth = Dimensions.get('window').width;

export default function ExpensesSummary({ userId }) {
  const [data, setData] = useState([]);
  const [currentWeekTotal, setCurrentWeekTotal] = useState(0);
  const [lastWeekTotal, setLastWeekTotal] = useState(0);

  const fetchExpensesByCategory = async () => {
    try {
      const { data: fetchedData, error } = await supabase.rpc('get_total_expenses_by_category', {
        p_user_id: userId
      });

      if (error) {
        console.log(error);
        throw new Error('Error fetching expenses by category');
      }

      // Map the fetched data to the format expected by PieChart and validate it
      const formattedData = fetchedData.map(item => {
        const amount = parseFloat(item.total_expense);
        const color = getColour(item.category);

        return {
          name: item.category,
          population: item.total_expense,
          color,
          legendFontColor: '#000000',
          legendFontSize: 12
        };
      }).filter(item => item !== null); // Remove invalid entries

      setData(formattedData);
    } catch (error) {
      console.error('Error fetching expenses by category:', error.message);
    }
  };

  const fetchWeeklyTotals = async () => {
    try {
      const { data: currentWeekData, error: currentWeekError } = await supabase.rpc('get_total_expenses_current_week', {
        p_user_id: userId
      });

      if (currentWeekError) {
        console.error('Error fetching current week expenses:', currentWeekError);
        return;
      }

      setCurrentWeekTotal(currentWeekData);

      const { data: lastWeekData, error: lastWeekError } = await supabase.rpc('get_total_expenses_last_week', {
        p_user_id: userId
      });

      if (lastWeekError) {
        console.error('Error fetching last week expenses:', lastWeekError);
        return;
      }

      setLastWeekTotal(lastWeekData);
    } catch (error) {
      console.error('Error fetching weekly totals:', error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchExpensesByCategory();
      fetchWeeklyTotals();
    }

    const subscription = supabase
      .channel('room1')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories', filter: `user_id=eq.${userId}` }, payload => {
        fetchExpensesByCategory();
        fetchWeeklyTotals();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userId]);

  const handleRefresh = () => {
    fetchExpensesByCategory();
    fetchWeeklyTotals();
  };

  return (
    <SafeAreaView className="flex-1 justify-start items-center">
      <TouchableOpacity className="bg-white rounded-lg p-5 shadow-lg w-11/12" onPress={handleRefresh}>
        {data.length > 0 ? (
          <PieChart
            data={data.map(item => ({
              name: item.name,
              population: item.population,
              color: item.color,
              legendFontColor: item.legendFontColor,
              legendFontSize: item.legendFontSize
            }))}
            width={screenWidth - 80}
            height={150}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="10"
            paddingRight="0"
            absolute
          />
        ) : (
          <Text className="text-gray-600 mb-4">No expenses data available.</Text>
        )}

        <View className="mt-1">
          <Text className="text-base text-black font-bold">Last Week: ${lastWeekTotal}</Text>
          <Text className="text-base text-black font-bold">This Week: ${currentWeekTotal}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
