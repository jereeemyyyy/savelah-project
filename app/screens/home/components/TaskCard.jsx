import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Utility function to truncate text
const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

const TaskCard = ({ item, onAdd, onDelete }) => (
  <View className="bg-white p-4 rounded-lg shadow-md mb-4 mx-4">
    <View className="flex-row items-center justify-between">
      <View className="flex-3">
        <Text className="text-lg font-bold truncate w-40">{truncateText(item.title, 25)}</Text>
        <Text className="truncate">{truncateText(item.description, 30)}</Text>
        <Text className="text-sm text-gray-500">{new Date(item.time).toLocaleString()}</Text>
      </View>
      <View className="flex-1 items-center w-40">
        <Text className={`text-center font-bold text-lg mr-1  ${item.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          ${item.amount}
        </Text>
      </View>
      <TaskActions onAdd={() => onAdd(item)} onDelete={() => onDelete(item)} />
    </View>
  </View>
);

const TaskActions = ({ onAdd, onDelete }) => (
  <>
    <TouchableOpacity
      onPress={onAdd}
      className="bg-purple-500 p-3 rounded"
    >
      <Text className="text-white font-bold">Add</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onDelete}
      className="bg-red-500 p-3 rounded ml-2"
    >
      <Icon name="times" size={19} color="white" />
    </TouchableOpacity>
  </>
);

export default TaskCard;
