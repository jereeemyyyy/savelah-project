// App.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { styled } from 'nativewind';

const categories = {
  Food: 'bg-red-500',
  Transport: 'bg-blue-500',
  Shopping: 'bg-green-500',
  Entertainment: 'bg-purple-500',
  Others: 'bg-yellow-500',
};

const initialData = [
  { id: '1', amount: 50, category: 'Food' },
  { id: '2', amount: 20, category: 'Transport' },
  { id: '3', amount: 100, category: 'Shopping' },
  { id: '4', amount: 60, category: 'Entertainment' },
];

export default function ExpensesCategoryButton() {
  const [data, setData] = useState(initialData);
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const handleAddItem = () => {
    if (newAmount && newCategory) {
      const newItem = {
        id: (data.length + 1).toString(),
        amount: parseFloat(newAmount),
        category: newCategory,
      };
      setData([...data, newItem]);
      setNewAmount('');
      setNewCategory('');
    }
  };

  const renderItem = ({ item }) => (
    <View className="w-1/2 p-2">
      <View className="bg-gray-200 p-4 rounded-lg">
        <Text className="text-xl font-bold">${item.amount}</Text>
        <Text className="text-gray-600">{item.category}</Text>
        <View className={`h-1 mt-2 ${categories[item.category] || 'bg-gray-400'}`}></View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 p-4 bg-white">
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
      <View className="mt-4">
        <TextInput
          value={newAmount}
          onChangeText={setNewAmount}
          placeholder="Amount"
          keyboardType="numeric"
          className="border p-2 mb-2 rounded"
        />
        <TextInput
          value={newCategory}
          onChangeText={setNewCategory}
          placeholder="Category"
          className="border p-2 mb-2 rounded"
        />
        <Button title="Add" onPress={handleAddItem} color="purple" />
      </View>
    </View>
  );
};

