// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Button, Modal } from 'react-native';
import { supabase } from '../../../../lib/supabase';
import ExpensesModal from './ExpensesModal';
import Icon from 'react-native-vector-icons/FontAwesome';


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
  

  useEffect(() => {
    fetchCategoriesAndExpenses();

    const subscription = supabase
      .channel('room1')
      .on('postgres_changes', 
        { event: '*', 
          schema: 'public', 
          table: 'categories', 
          filter: `user_id=eq.${userId}` 
        }, payload => {
          fetchCategoriesAndExpenses(); 
        })
        .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userId]);

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
      <View className="flex-row items-center justify-between">
        <Text className="font-bold text-3xl p-4 text-white -ml-2 -mt-2">Categories</Text> 
        <TouchableOpacity
            onPress={fetchCategoriesAndExpenses}
            className="bg-purple-500 p-3 rounded ml-4 mr-2"
          >
            <Icon name="refresh" size={22} color="white" />
          </TouchableOpacity>
      </View>

      {categories.length <= 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg">No Categories available.</Text>
          <Text className="text-white text-lg mb-8">Create one in the Budgets screen!</Text>
        </View>
      ) : (
        <FlatList
          data={categories}
          renderItem={({ item }) => renderItem({ item })}
          keyExtractor={(item) => item.category.toString()}
          numColumns={2}
          />
      )}
      
      
      {selectedItem && (
        <ExpensesModal 
          selectedItem={selectedItem} 
          visible={modalVisible} 
          onClose={() => setModalVisible(!modalVisible)}
        />
      )}
    </View>
  );
}
