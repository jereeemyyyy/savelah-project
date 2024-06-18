import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BudgetModal from './components/BudgetModal';

export default function BudgetsScreen() {
  const [budgetGoal, setBudgetGoal] = useState(400);
  const [totalBudget] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pressed, setPressed] = useState(null);


  // Should fetch data from categories table in supabase
  const categories = [
    { id: 1, name: 'Food', icon: 'restaurant'},
    { id: 2, name: 'Transportation', icon: 'car'},
    { id: 3, name: 'Housing', icon: 'home'},
  ];

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
                <Text className="text-white font-bold">{category.name}</Text>
                {selectedCategory?.id === category.id && (
                  <Text className="text-white font-bold">
                    ${budgetGoal}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    </View>
  );
}