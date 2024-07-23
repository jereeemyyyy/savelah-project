import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddTaskButton from './AddTaskButton';
import { supabase } from '../../../../lib/supabase';
import ConfirmationModal from './ConfirmationModal'; // Import the modal component
import DeleteConfirmationModal from './DeleteConfirmationModal'; // Import the delete modal component
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import io from 'socket.io-client';

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Error getting user:', userError);
        return;
      }

      const user = userData?.user;
      if (!user) {
        console.error('No user found');
        return;
      }

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
          time: task.time,
        }));
        setTasks(formattedTasks);
      }
    } catch (error) {
      console.error('Unexpected error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const BANK_API_URL = 'https://bank-api-djga.onrender.com'; // Render URL to bank API
  const LOCALHOST_URL = 'http://192.168.18.79:4000'; // Ignore this, used for testing in local host.

  // Fetch tasks and set up WebSocket connection
  // useEffect(() => {
  //   fetchTasks();

  //   const socket = io(BANK_API_URL); // Replace with your server's IP address

  //   socket.on('connect', () => {
  //     console.log('Connected to WebSocket server');
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from WebSocket server');
  //   });

  //   socket.on('new_transaction', async (transaction) => {
  //     console.log('Received new transaction:', transaction); // For debugging
  //     try {
  //       const { data: userData, error: userError } = await supabase.auth.getUser();
  //       if (userError) {
  //         console.error('Error getting user:', userError);
  //         return;
  //       }

  //       const user = userData?.user;
  //       if (!user) {
  //         console.error('No user found');
  //         return;
  //       }

  //       const { data, error } = await supabase
  //         .from('to_do_list')
  //         .insert([
  //           {
  //             user_id: user.id,
  //             title: transaction.title,
  //             description: transaction.description,
  //             amount_spent: transaction.amount_spent,
  //             time: transaction.time
  //           }
  //         ]).select();

  //       if (error) {
  //         console.error('Error inserting transaction:', error);
  //       } else {
  //         console.log('Inserted transaction data:', data); // Add this line to log inserted data
  //         setTasks(prevTasks => [data[0], ...prevTasks]);
  //       }
  //     } catch (error) {
  //       console.error('Unexpected error inserting transaction:', error);
  //     }
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleAddToConfirmation = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const handleDeleteConfirmation = (task) => {
    setSelectedTask(task);
    setDeleteModalVisible(true);
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
        <TouchableOpacity
          onPress={() => handleDeleteConfirmation(item)}
          className="bg-red-500 p-3 rounded ml-2"
        >
          <Icon name="times" size={19} color="white" />
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
      {tasks.length <= 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg mb-10">No tasks available. Add a new expense!</Text>
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
      {selectedTask && (
        <ApplicationProvider {...eva} theme={eva.light}>
          <DeleteConfirmationModal
            task={selectedTask}
            modalVisible={deleteModalVisible}
            setModalVisible={setDeleteModalVisible}
            fetchTasks={fetchTasks}
          />
        </ApplicationProvider>
      )}
    </SafeAreaView>
  );
}
