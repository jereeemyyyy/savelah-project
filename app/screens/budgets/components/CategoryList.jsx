import React from 'react';
import { ScrollView, View, Text} from 'react-native';
import CategoryItem from './CategoryItem'

const CategoryList = ({ categories, pressed, selectedCategory, handleCategorySelect }) => {
 
  
  return (
    <View className="flex-1">
        {categories.length <= 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg">No Categories available.</Text>
          <Text className="text-white text-m mb-8">Create one by clicking the Add Category button!</Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="ml-12 mb-6"
        >
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              pressed={pressed}
              selectedCategory={selectedCategory}
              handleCategorySelect={handleCategorySelect}
            />
          ))}
        </ScrollView>  
      )}
    </View>
    
  );
};

export default CategoryList;