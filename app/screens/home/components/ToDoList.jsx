import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddExpenseButton from './AddExpenseButton';

const mockTasksFromDatabase = [
  { id: 1, title: 'Task 1', description: 'Description of Task 1', amount: 100, time: '10:00 AM' },
  { id: 2, title: 'Task 2', description: 'Description of 2', amount: -50, time: '12:30 PM' },
  { id: 3, title: 'Task 3', description: 'Description of Task 3', amount: 200, time: '3:45 PM' },
  // Add more tasks as needed
];

const defaultCategories = ['Food', 'Transport', 'Housing'];

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Simulate fetching tasks from an external database
    setTimeout(() => {
      setTasks(mockTasksFromDatabase);
    }, 1000); // Simulating delay for fetching data
  }, []);

  const fetchTasks = () => {
    // Simulate fetching tasks from an external database
    setTimeout(() => {
      setTasks(mockTasksFromDatabase);
    }, 1000); // Simulating delay for fetching data
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleAddToConfirmation = (task) => {
    // Logic to add task to another list for confirmation
    console.log(`Added task "${task.title}" to confirmation list.`);
  };

  const renderItem = ({ item }) => (
    <View className="bg-white p-4 rounded-lg shadow-md mb-4 mx-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-3">
          <Text className="text-lg font-bold">{item.title}</Text>
          <Text>{item.description}</Text>
          <Text className="text-sm text-gray-500">{item.time}</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className={`font-bold text-lg ${item.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
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
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row bg-gray-900 p-4 justify-between">
        <Text className="text-2xl font-bold text-white mb-4">To-Do List</Text>
        <View className="flex-row items-center">

          <AddExpenseButton addTask={addTask} />
          <TouchableOpacity
            onPress={fetchTasks}
            className="bg-purple-500 p-3 rounded ml-4"
          >
            <Icon name="refresh" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="p-4"
      />
    </SafeAreaView>
  );
}
