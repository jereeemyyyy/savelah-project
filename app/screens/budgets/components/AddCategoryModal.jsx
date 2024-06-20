import React, { useState } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ChooseIconPopup from './ChooseIconPopup';
import { MaterialIcons } from '@expo/vector-icons';

export default function AddCategoryModal({ visible, onClose, onAddCategory }) {
  const [categoryName, setCategoryName] = useState('');
  const [categoryAmount, setCategoryAmount] = useState('');
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [showIconPopup, setShowIconPopup] = useState(false);

  const handleIconSelect = (iconName) => {
    setCategoryIcon(iconName);
    setShowIconPopup(false);
  };

  const handleAddCategory = () => {
    if (categoryName && categoryAmount && categoryIcon) {
      const newCategory = {
        name: categoryName,
        amount: parseFloat(categoryAmount),
        icon: categoryIcon,
      };
      onAddCategory(newCategory);
      setCategoryName('');
      setCategoryAmount('');
      setCategoryIcon(null);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View className="flex-1 bg-black/50">
        <View className="flex-1 justify-center items-center">
          <View className="bg-gray-800 p-6 rounded-lg justify-center p-3">
            <View className="flex-row justify-between items-center mb-5">  
                <TouchableOpacity onPress={onClose} className="mr-2">
                    <MaterialIcons name="cancel" size={24} color="red"/> 
                </TouchableOpacity>
                <Text className="text-white font-bold text-2xl mr-9">Add Category</Text>
            </View>
            
            <TextInput
              placeholder="Category Name"
              placeholderTextColor="gray"
              value={categoryName}
              onChangeText={setCategoryName}
              className="border border-gray-400 p-2 mb-2 w-60"
            />
            <TextInput
              placeholder="Category Amount"
              placeholderTextColor="gray"
              value={categoryAmount}
              onChangeText={setCategoryAmount}
              keyboardType="numeric"
              className="border border-gray-400 p-2 mb-2"
            />
            <View className="items-center"> 
                <TouchableOpacity
                onPress={() => setShowIconPopup(true)}
                className="flex-row items-center mb-2"
                >
                {categoryIcon ? (
                    <Ionicons name={categoryIcon} size={24} color="white" />
                ) : (
                    <Text className="text-white">Choose Icon</Text>
                )}
                </TouchableOpacity>
            </View>
            <View className="items-center">
                <TouchableOpacity
                onPress={handleAddCategory}
                className="bg-blue-500 p-2 rounded bg-violet-500 w-40 justify-center items-center"
                >
                <Text className="text-white font-bold">Add</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <ChooseIconPopup
        visible={showIconPopup}
        onIconSelect={handleIconSelect}
        onClose={() => setShowIconPopup(false)}
      />
    </Modal>
  );
}