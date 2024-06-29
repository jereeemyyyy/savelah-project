import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { supabase } from '../../../../lib/supabase';

export default function AddTaskButton({ addTask, fetchTasks }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = async () => {
    if (title && description && amount) {
      const { data, error } = await supabase
        .from('to_do_list')
        .insert([
          {
            title,
            description,
            amount_spent: parseInt(amount),
          },
        ]);

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        const newTask = {
          id: Date.now(),
          title,
          description,
          amount: parseFloat(amount),
        };
        addTask(newTask);
        setModalVisible(false);
        setTitle('');
        setDescription('');
        setAmount('');
      }
      setTimeout(() => {
        setTasks();
      }, 1000);
      fetchTasks();
    }
  };

  return (
    <View className="items-center justify-center m-2">
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-purple-500 p-2 rounded"
      >
        <Text className="text-white text-base">New Expense</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="m-5 bg-white rounded-2xl p-9 items-center shadow-lg">
          <Text className="mb-4 text-center text-lg font-bold text-black">Create New Expense</Text>
          <TextInput
            placeholder="Title"
            className="w-4/5 h-10 border border-gray-300 rounded px-3 mb-3"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Description"
            className="w-4/5 h-10 border border-gray-300 rounded px-3 mb-3"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            placeholder="Amount"
            className="w-4/5 h-10 border border-gray-300 rounded px-3 mb-3"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <TouchableOpacity
            className="bg-purple-500 p-2 rounded mb-2"
            onPress={handleAddTask}
          >
            <Text className="text-white text-base">Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-purple-500 p-2 rounded"
            onPress={() => setModalVisible(false)}
          >
            <Text className="text-white text-base">Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
