import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddTaskButton from './AddTaskButton';
import { supabase } from '../../../../lib/supabase';
import ConfirmationModal from './ConfirmationModal'; // Import the modal component
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

const defaultCategories = ['Food', 'Transport', 'Housing'];

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('to_do_list')
          .select('*')
          .eq('user_id', user.id);
        if (error) {
          console.error('Error fetching tasks:', error);
        } else {
          const formattedTasks = data.map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            amount: task.amount_spent,
            time: task.time 
          }));
          setTasks(formattedTasks);
        }
      }
    } catch (error) {
      console.error('Unexpected error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleAddToConfirmation = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View className="bg-white p-4 rounded-lg shadow-md mb-4 mx-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-3">
          <Text className="text-lg font-bold">{item.title}</Text>
          <Text>{item.description}</Text>
          <Text className="text-sm text-gray-500">{new Date(item.time).toLocaleString()}</Text>
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
      <View className="flex-row bg-gray-800 p-4 justify-between items-center">
        <Text className="text-3xl font-bold text-white mb-1">To-Do List</Text>
          <AddTaskButton 
            addTask={addTask} 
            fetchTasks={fetchTasks}
          />
          <TouchableOpacity
            onPress={fetchTasks}
            className="bg-purple-500 p-3 rounded -ml-8"
          >
            <Icon name="refresh" size={22} color="white" />
          </TouchableOpacity>
        
      </View>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerClassName="p-4"
        />
      )}
      {selectedTask && (
        <ApplicationProvider {...eva} theme={eva.light}>
          <ConfirmationModal
            task={selectedTask}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            fetchTasks={fetchTasks}
          />
        </ApplicationProvider>
      )}
    </SafeAreaView>
  );
}
