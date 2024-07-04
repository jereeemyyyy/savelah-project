import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

const AddCategoryButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="bg-purple-500 w-30 h-10 rounded-lg p-2 items-center flex-row">
        <FontAwesome6 name="add" size={18} color="white" />
        <Text className="text-white text-xs font-bold ml-2 ">Add Category</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddCategoryButton;