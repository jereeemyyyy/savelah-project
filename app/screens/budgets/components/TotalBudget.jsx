import React from 'react';
import { Text, View } from 'react-native';

const TotalBudget = ({ totalBudget }) => {
  return (
    <View className="flex-row">
      <Text className="text-white">Total budget is </Text> 
      <Text className="text-white font-bold">${totalBudget}</Text>
    </View>
    
  );
};

export default TotalBudget;