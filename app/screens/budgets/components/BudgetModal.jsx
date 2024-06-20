import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Entypo } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const BudgetModal = ({ visible, onClose, budgetGoal, totalBudget, onBudgetChange, onSave, onDelete }) => {
  
  // Settings for the modal dimensions
  const modalHeight = height / 2;
  const topSectionHeight = 2 * modalHeight / 6;
  const bottomSectionHeight = modalHeight - topSectionHeight;

  // Creates the alert box
  const createTwoButtonAlert = () =>
    Alert.alert('Confirmation', `Are you sure you want to add $${budgetGoal} into this category?` , [
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
                <TouchableOpacity className="mr-3">
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
            <View className="">
              <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={0}
                maximumValue={totalBudget}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#FFFFFF"
                value={budgetGoal}
                onValueChange={onBudgetChange}
                step={1}
              />
              <Text className="text-center text-white mt-2">${budgetGoal.toFixed(0)}</Text>
            </View>
            <View className="flex-col flex-1 justify-start">
                <Text className="text-white px-2 font-bold text-xl">
                {budgetGoal > totalBudget ? 'Over Budget' : 'Normal'}
                </Text>
                <Text className="my-2 ml-2 text-white">
                    {budgetGoal > totalBudget 
                     ? 'Oh no! You exceeded your budget' 
                     : 'Its ok! This amount is just within your budget!'}
                </Text>
            </View> 
            <TouchableOpacity className="bg-white rounded-full py-3 mt-4" onPress={createTwoButtonAlert}>
              <Text className="text-center text-purple-500 font-bold">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View> 
    </Modal>
  );
};

export default BudgetModal;
