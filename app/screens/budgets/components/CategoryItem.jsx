import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CategoryItem = ({ category, pressed, selectedCategory, handleCategorySelect }) => {
  return (
    <TouchableOpacity
      key={category.id}
      onPress={() => handleCategorySelect(category)}
      className="h-20 mr-1"
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
              {pressed ? category.amount : ''}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;