// App.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Button, Modal } from 'react-native';
import { styled } from 'nativewind';

// Initial categories with predefined colors
const initialCategories = {
  Food: '#FF0000',            // Red
  Transportation: '#0000FF',  // Blue
  Housing: '#00FF00',         // Green
  Others: '#FFFF00',          // Yellow
};

// Initial data for expenses
const initialData = [
  { id: '1', amount: 50, category: 'Food' },
  { id: '2', amount: 20, category: 'Transportation' },
  { id: '3', amount: 100, category: 'Housing' },
];

// Styled components using NativeWind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledModal = styled(Modal);

// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function ExpensesCategoryButton() {
  const [data, setData] = useState(initialData);
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState(initialCategories);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const handleAddItem = () => {
    if (newAmount && newCategory) {
      const newItem = {
        id: (data.length + 1).toString(),
        amount: parseFloat(newAmount),
        category: newCategory,
      };
      setData([...data, newItem]);

      // Add new category with a random color if it doesn't already exist
      if (!categories[newCategory]) {
        const newCategories = { ...categories, [newCategory]: getRandomColor() };
        setCategories(newCategories);
      }

      setNewAmount('');
      setNewCategory('');
      setAddModalVisible(false); // Close the add modal
    }
  };

  const handlePressItem = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <StyledTouchableOpacity className="w-1/2 p-2" onPress={() => handlePressItem(item)}>
      <StyledView className="bg-gray-200 p-4 rounded-lg">
        <StyledText className="text-xl font-bold">${item.amount}</StyledText>
        <StyledText className="text-gray-600">{item.category}</StyledText>
        <StyledView style={{ height: 4, marginTop: 8, backgroundColor: categories[item.category] || '#ccc' }} />
      </StyledView>
    </StyledTouchableOpacity>
  );

  const renderAddButton = () => (
    <StyledTouchableOpacity className="w-1/2 p-2" onPress={() => setAddModalVisible(true)}>
      <StyledView className="bg-purple-600 p-3 rounded-lg justify-center items-center">
        <StyledView className="w-16 h-16 bg-purple-100 rounded-full justify-center items-center" style={{ backgroundColor: 'rgba(128, 0, 128, 0.8)' }}>
          <StyledText className="text-5xl font-bold text-white">+</StyledText>
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  );

  return (
    <StyledView className="flex-1 p-4 bg-gray-800">
      <FlatList
        data={[...data, { id: 'add', isAddButton: true }]}
        renderItem={({ item }) => item.isAddButton ? renderAddButton() : renderItem({ item })}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
      
      {selectedItem && (
        <StyledModal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <StyledView className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <StyledView className="m-4 bg-white rounded-lg p-6">
              <StyledText className="text-xl font-bold mb-2">{selectedItem.category}</StyledText>
              <StyledText className="text-gray-600 mb-4">Amount Spent: ${selectedItem.amount}</StyledText>
              <Button title="Close" onPress={() => setModalVisible(!modalVisible)} color="purple" />
            </StyledView>
          </StyledView>
        </StyledModal>
      )}
      
      <StyledModal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => setAddModalVisible(!addModalVisible)}
      >
        <StyledView className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <StyledView className="m-4 bg-white rounded-lg p-6">
            <StyledText className="text-xl font-bold mb-4">Add New Expense</StyledText>
            <StyledTextInput
              value={newCategory}
              onChangeText={setNewCategory}
              placeholder="Category"
              className="border p-2 mb-2 rounded bg-white"
            />
            <StyledTextInput
              value={newAmount}
              onChangeText={setNewAmount}
              placeholder="Amount"
              keyboardType="numeric"
              className="border p-2 mb-2 rounded bg-white"
            />
            <View className="flex-row justify-between">
              <View className="w-1/2 p-1">
                <Button title="Add" onPress={handleAddItem} color="purple" />
              </View>
              <View className="w-1/2 p-1">
                <Button title="Cancel" onPress={() => setAddModalVisible(!addModalVisible)} color="gray" />
              </View>
            </View>
          </StyledView>
        </StyledView>
      </StyledModal>
    </StyledView>
  );
}
