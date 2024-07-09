import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions, Alert, TextInput, KeyboardAvoidingView, Platform, Keyboard} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const BudgetModal = ({ visible, onClose, budgetGoal, totalBudget, onBudgetChange, onSave, onDelete }) => {

  const [calculatorVisible, setCalculatorVisible] = useState(false);
  const [calculatorInput, setCalculatorInput] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardHeight(0)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  
  // Settings for the modal dimensions
  const modalHeight = height / 2;
  const topSectionHeight = 2 * modalHeight / 6;
  const bottomSectionHeight = modalHeight - topSectionHeight;

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleCalculatorSave = () => {
    const newValue = parseFloat(calculatorInput);
    if (!isNaN(newValue)) {
      onBudgetChange(newValue);
      setCalculatorVisible(false);
      setCalculatorInput('');
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid number.');
    }
  };


  // Creates the alert box
  const createTwoButtonAlert = () =>
    Alert.alert('Confirmation', `Are you sure you want to update your budget to $${budgetGoal} in this category?` , [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: onSave},
    ]);

  // Creates the alert box for deleting the category
  const createDeleteAlert = () =>
    Alert.alert('Delete Category', 'Are you sure you want to delete this category?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Delete', onPress: onDelete },
    ]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        className="absolute bottom-0 left-0 right-0 rounded-t-lg"
        style={{ height: modalHeight }}
      >
        <View className="bg-white rounded-t-lg" style={{ height: topSectionHeight }}>
          <View className="flex-1 flex-col justify-end p-2 mt-3 mb-7">
            <TouchableOpacity onPress={onClose}
                              className="p-2 content-start"
            >
                <Ionicons name="arrow-back-circle" size={28} color="black" />
            </TouchableOpacity>
            <View className="flex-row justify-between">
              <Text className="ml-10  font-bold text-black text-5xl">${budgetGoal}</Text>


              <View className="mt-1 mr-2 flex-row">
                <TouchableOpacity className="mr-3" onPress={() => setCalculatorVisible(true)}>
                  <Ionicons name="calculator" size={34} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={createDeleteAlert}>
                    <Entypo name="circle-with-cross" size={34} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View className="bg-violet-500 rounded-xl" style={{ height: bottomSectionHeight }}>
          <View className="h-full justify-between p-6">
            
            <View className="flex-col flex-1 justify-start">
                <Text className="text-white px-2 font-bold text-xl">
                {budgetGoal > totalBudget ? 'Over Budget' : 'Normal'}
                </Text>
                <Text className="my-2 ml-2 text-white">
                    {budgetGoal > totalBudget 
                     ? 'Oh no! You are increasing your budget' 
                     : 'Its ok! This amount is just within your previous budget!'}
                </Text>
            </View> 
            <TouchableOpacity className="bg-white rounded-full py-3 mt-4" onPress={createTwoButtonAlert}>
              <Text className="text-center text-purple-500 font-bold">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View> 

      {/* Keyboard Modal */}
      <Modal visible={calculatorVisible} animationType="fade" transparent>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View className="flex-1 justify-end">
            <View className="bg-white h-44 p-4 rounded-t-lg">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold">Enter Amount</Text>
                <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                  <Text className="text-blue-500 font-bold">Done</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                className="border border-gray-300 rounded p-2 mb-4 text-2xl"
                keyboardType="numeric"
                value={calculatorInput}
                onChangeText={setCalculatorInput}
                autoFocus
              />
              <View className="flex-row justify-end" style={{ marginBottom: keyboardHeight }}>
                <TouchableOpacity 
                  className="bg-gray-200 rounded-full h-8 px-4 py-2 mr-2"
                  onPress={() => {
                    setCalculatorVisible(false);
                    setCalculatorInput('');
                  }}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="bg-violet-500 rounded-full h-8 px-4 py-2"
                  onPress={handleCalculatorSave}
                >
                  <Text className="text-white">Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </Modal>
  );
};

export default BudgetModal;
