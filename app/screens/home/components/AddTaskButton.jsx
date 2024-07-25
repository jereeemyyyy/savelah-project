import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { supabase } from '../../../../lib/supabase';
import { MaterialIcons } from '@expo/vector-icons';

export default function AddTaskButton({ addTask, fetchTasks }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = async () => {
    let missingFields = [];

    if (!title) missingFields.push("Title");
    if (!description) missingFields.push("Description");
    if (!amount) missingFields.push("Amount");

    if (missingFields.length > 0) {
      Alert.alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return;
    }

    if (isNaN(amount)) {
      Alert.alert('Error', 'Amount must be a number.');
      return;
    }

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
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setTitle('');
    setDescription('');
    setAmount('');
  }


  return (
    <View className="items-center justify-center m-2">
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-purple-500 p-2 rounded"
      >
        <Text className="text-white text-base">New Expense</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >

        <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className="bg-white rounded-2xl p-4 py-8 items-center shadow-lg">
              <Text className="-mt-3 text-2xl font-bold text-black">Create New Expense</Text>
              <TouchableOpacity
                            onPress={handleCloseModal}
                            style={{ position: 'absolute', top: 15, right: 15 }}
                            className=""
                          
                        >
                  <MaterialIcons name="cancel" size={24} color="black" />
              </TouchableOpacity>


            <View className="form space-y-2 w-80 items-center">
              <TextInput
                placeholder="Title"
                className="w-4/5 h-10 border border-gray-300 rounded px-3 mb-3 mt-4"
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
                className="bg-purple-500 p-2 rounded my-2 w-40 items-center"
                onPress={handleAddTask}
              >
                <Text className="text-white text-base">Create</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </Modal>
    </View>
  );
};
