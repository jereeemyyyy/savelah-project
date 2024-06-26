import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddExpenseButton = ({ addTask }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [time, setTime] = useState('');

  const handleAddTask = () => {
    if (title && description && amount && time) {
      const newTask = {
        id: Date.now(), // Unique ID for the task
        title,
        description,
        amount: parseFloat(amount),
        time,
      };
      addTask(newTask);
      setModalVisible(false);
      setTitle('');
      setDescription('');
      setAmount('');
      setTime('');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add New Task</Text>
          <TextInput
            placeholder="Title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Description"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            placeholder="Amount"
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Time"
            style={styles.input}
            value={time}
            onChangeText={setTime}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleAddTask}
          >
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  button: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default AddExpenseButton;
