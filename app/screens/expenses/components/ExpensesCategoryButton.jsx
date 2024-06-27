// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Button, Modal } from 'react-native';
import { supabase } from '../../../../lib/supabase';


// Initial categories with predefined colors
const initialCategories = {
  Food: '#FF0000',            // Red
  Transportation: '#0000FF',  // Blue
  Housing: '#00FF00',         // Green
  Others: '#FFFF00',          // Yellow
};

// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function ExpensesCategoryButton({userId}) {

  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {

    const fetchCategoriesAndExpenses = async () => {
      try {
        const { data, error } = await supabase.rpc('get_total_expenses_by_category', { p_user_id: userId });
        
        if (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
        
        setCategories(data);
      } catch (error) {
        console.error('Error in fetchCategoriesAndExpenses:', error.message);
      }
    };

    fetchCategoriesAndExpenses();
  }, [userId]);


  const handlePressItem = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity className="w-1/2 p-2" onPress={() => handlePressItem(item)}>
      <View className="bg-gray-200 p-4 rounded-lg">
        <Text className="text-xl font-bold">${item.total_expense}</Text>
        <Text className="text-gray-600">{item.category}</Text>
        <View style={{ height: 4, marginTop: 8, backgroundColor: getRandomColor() }} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4 bg-gray-800">
      <FlatList
        data={categories}
        renderItem={({ item }) => renderItem({ item })}
        keyExtractor={(item) => item.category.toString()}
        numColumns={2}
      />
      
      {selectedItem && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View className="m-4 bg-white rounded-lg p-6">
              <Text className="text-xl font-bold mb-2">{selectedItem.category}</Text>
              <Text className="text-gray-600 mb-4">Amount Spent: ${selectedItem.total_expense}</Text>
              <Button title="Close" onPress={() => setModalVisible(!modalVisible)} color="purple" />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
