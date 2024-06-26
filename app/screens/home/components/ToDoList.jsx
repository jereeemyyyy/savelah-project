import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddExpenseButton from './AddExpenseButton';

const mockTasksFromDatabase = [
  { id: 1, title: 'Task 1', description: 'Description of Task 1', amount: 100, time: '10:00 AM' },
  { id: 2, title: 'Task 2', description: 'Description of 2', amount: -50, time: '12:30 PM' },
  { id: 3, title: 'Task 3', description: 'Description of Task 3', amount: 200, time: '3:45 PM' },
  // Add more tasks as needed
];

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
    <View style={styles.itemContainer}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text style={styles.taskTime}>{item.time}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[styles.amount, item.amount >= 0 ? styles.positiveAmount : styles.negativeAmount]}>
          ${item.amount}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleAddToConfirmation(item)}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>To-Do List</Text>
        <View style={styles.headerButtons}>
          <AddExpenseButton addTask={addTask} />
          <TouchableOpacity
            onPress={fetchTasks}
            style={styles.refreshButton}
          >
            <Icon name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'gray',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshButton: {
    backgroundColor: 'purple',
    padding: 8,
    borderRadius: 5,
    marginLeft: 8,
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'gray',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    margin: 8,
    borderRadius: 8,
  },
  taskInfo: {
    flex: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskTime: {
    fontSize: 12,
    color: 'gray',
  },
  amountContainer: {
    flex: 1,
    alignItems: 'center',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  positiveAmount: {
    color: 'green',
  },
  negativeAmount: {
    color: 'red',
  },
  addButton: {
    backgroundColor: 'purple',
    padding: 8,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

