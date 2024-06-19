import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import BudgetModal from './components/BudgetModal';
import AddCategoryModal from './components/AddCategoryModal';
import { supabase } from '../../../lib/supabase';

export default function BudgetsScreen() {
  const [budgetGoal, setBudgetGoal] = useState(400);
  const [totalBudget] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pressed, setPressed] = useState(null);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [categories, setCategories] = useState([]);


  // Should fetch data from categories table in supabase
  // const categories = [
  //   { id: 1, name: 'Food', icon: 'restaurant'},
  //   { id: 2, name: 'Transportation', icon: 'car'},
  //   { id: 3, name: 'Housing', icon: 'home'},
  // ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
    setPressed(category.id);
  };

  const handleBudgetChange = (value) => {
    setBudgetGoal(value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPressed(null);
  }

  // Add a new category function
  const handleAddCategory = async (newCategory) => {
    try {
      const { data: user, error: userError } = await supabase.auth.getUser();
  
      if (userError) {
        throw new Error('Error fetching user');
      }
  
      if (!user) throw new Error('User not authenticated');
  
      const { data, error } = await supabase
        .from('categories')
        .insert({ amount: newCategory.amount, icon: newCategory.icon, category: newCategory.name,  })
        .select();
  
      if (error) {
        console.log('Error adding category1:', error);
      } else {
        setCategories([...categories, ...data]);
        setShowAddCategoryModal(false);
      }
    } catch (error) {
      console.log('Error adding category:', error);
    }
  };

  return (
    <View className="flex-1 bg-gray-800 p-6">
      <Text className="text-white text-4xl font-bold mb-6 mt-6">
        Set up a monthly budget goal
      </Text>
      <Text className="text-white mb-4">Total budget is ${totalBudget}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="ml-12 mb-6"
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleCategorySelect(category)}
          >
            <View
              className={`bg-${pressed === category.id ? 'violet' : 'gray'}-500 
                          h-20 rounded-lg p-4 mr-4 flex-row items-center`}
            >
              <Ionicons
                name={category.icon}
                size={24}
                color="white"
                style={{ marginRight: 8 }}
              />
              <View className="flex-1">
                <Text className="text-white font-bold">{category.category}</Text>
                {selectedCategory?.id === category.id && (
                  <Text className="text-white font-bold">
                    {pressed ? budgetGoal : ''}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={() => setShowAddCategoryModal(true)}>
          <View className="bg-gray-500 h-20 rounded-lg p-4 items-center flex-row">
            <FontAwesome6 name="add" size={28} color="white" />
            <Text className="text-white font-bold ml-2 ">Add Category</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      
      
      <BudgetModal
      visible={showModal}
      onClose={handleCloseModal}
      budgetGoal={budgetGoal}
      totalBudget={totalBudget}
      onBudgetChange={handleBudgetChange}
      onSave={() => {
        console.log('Budget saved:', budgetGoal);
        setShowModal(false);
      }}
      />

      <AddCategoryModal
        visible={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
        onAddCategory={handleAddCategory}
      />
    </View>
  );
}