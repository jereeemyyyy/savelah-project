import React, { useState } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
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

  // const handleAddCategory = () => {
  //   if (categoryName && categoryAmount && categoryIcon) {
  //     const newCategory = {
  //       name: categoryName,
  //       amount: parseFloat(categoryAmount),
  //       icon: categoryIcon,
  //     };
  //     onAddCategory(newCategory);
  //     setCategoryName('');
  //     setCategoryAmount('');
  //     setCategoryIcon(null);
  //     onClose();
  //   }
  // };

  const handleAddCategory = () => {
    const missingFields = [];

    if (!categoryName.trim()) missingFields.push('Category Name');
    if (!categoryAmount.trim()) missingFields.push('Category Amount');
    if (!categoryIcon) missingFields.push('Category Icon');

    if (missingFields.length > 0) {
      Alert.alert(
        'Incomplete Information',
        `Please fill in the following field(s): ${missingFields.join(', ')}`,
        [{ text: 'OK' }]
      );
    } else {
      const newCategory = {
        name: categoryName.trim(),
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
          <View className="bg-white p-6 rounded-lg justify-center p-3">
            <View className="flex-row justify-between items-center mb-3">  
                <Text className="text-black font-bold text-2xl ml-9">Add Category</Text>
                <TouchableOpacity onPress={onClose} className="mr-2">
                    <MaterialIcons name="cancel" size={24} color="black"/> 
                </TouchableOpacity>
            </View>
            
            <TextInput
              placeholder="Category Name"
              placeholderTextColor="gray"
              value={categoryName}
              onChangeText={setCategoryName}
              style={{ color: 'black' }}
              className="border border-gray-400 p-2 mb-3 w-60"
            />
            <TextInput
              placeholder="Category Amount"
              placeholderTextColor="gray"
              value={categoryAmount}
              onChangeText={setCategoryAmount}
              style={{ color: 'black' }}
              keyboardType="numeric"
              className="border border-gray-400 p-2 mb-3"
            />
            <View className="items-center"> 
                <TouchableOpacity
                onPress={() => setShowIconPopup(true)}
                className="flex-row items-center mb-2"
                >
                {categoryIcon ? (
                    <Ionicons name={categoryIcon} size={24} color="black" />
                ) : (
                    <View className="bg-indigo-500 rounded p-2">
                        <Text className="text-white font-bold">Choose Icon</Text>
                    </View>
                    
                )}
                </TouchableOpacity>
            </View>
            <View className="items-center">
                <TouchableOpacity
                onPress={handleAddCategory}
                className="bg-blue-500 py-2 px-9 rounded bg-violet-500 justify-center items-center"
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