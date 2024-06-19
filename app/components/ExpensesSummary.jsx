import React from 'react';
import { View, Text, Dimensions, SafeAreaView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const data = [ // placeholder data
  { name: 'Food', amount: 200, color: '#FF0000', legendFontColor: '#000000', legendFontSize: 12 },            // Red
  { name: 'Transportation', amount: 150, color: '#0000FF', legendFontColor: '#000000', legendFontSize: 12 },  // Blue
  { name: 'Housing', amount: 100, color: '#00FF00', legendFontColor: '#000000', legendFontSize: 12 },         // Green
  { name: 'Others', amount: 50, color: '#FFFF00', legendFontColor: '#000000', legendFontSize: 12 },           // Yellow
];

const lastWeekTotal = data.reduce((sum, item) => sum + item.amount, 0);
const thisWeekTotal = data.reduce((sum, item) => sum + item.amount, 0); // Replace this with actual data for this week

export default function ExpensesSummary() {
  return (
    <SafeAreaView className="flex-1 justify-start items-center">
      <View className="bg-white rounded-lg p-5 shadow-lg w-11/12">
          <PieChart
          data={data.map(item => ({
              name: item.name,
              population: item.amount,
              color: item.color,
              legendFontColor: item.legendFontColor,
              legendFontSize: item.legendFontSize
          }))}
          width={screenWidth - 60}
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
          <View className="mt-1">
          <Text className="text-base text-black">Last Week: ${lastWeekTotal}</Text>
          <Text className="text-base text-black">This Week: ${thisWeekTotal}</Text>
          </View>
      </View>
    </SafeAreaView>
  );
}
