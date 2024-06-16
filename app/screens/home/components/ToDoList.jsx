// ToDoList.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, SafeAreaView} from 'react-native';
import { styled } from 'nativewind';

const mockTasksFromDatabase = [
  { id: 1, title: 'Task 1', description: 'Description of Task 1', amount: 100, time: '10:00 AM' },
  { id: 2, title: 'Task 2', description: 'Description of Task 2', amount: -50, time: '12:30 PM' },
  { id: 3, title: 'Task 3', description: 'Description of Task 3', amount: 200, time: '3:45 PM' },
  // Add more tasks as needed
];

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Simulate fetching tasks from an external database
    // Replace with actual API call or database query
    setTimeout(() => {
      setTasks(mockTasksFromDatabase);
    }, 1000); // Simulating delay for fetching data
  }, []);

  const handleAddToConfirmation = (task) => {
    // Logic to add task to another list for confirmation
    console.log(`Added task "${task.title}" to confirmation list.`);
  };

  const renderItem = ({ item }) => (
    <View className="flex-row justify-between items-center p-3 bg-gray-100 m-2 rounded-lg">
      <View>
        <Text className="text-lg font-bold">{item.title}</Text>
        <Text>{item.description}</Text>
        <Text className="text-sm text-gray-500">{item.time}</Text>
      </View>
      <View>
        <Text className={`text-lg font-bold ${item.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          ${item.amount}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleAddToConfirmation(item)}
        className="bg-purple-500 p-3 rounded"
      >
        <Text className="text-white font-bold">Add</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 justify-start">
        <View className="flex-1 bg-grey-100">
        <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
        </View>
    </SafeAreaView>
  );
};

