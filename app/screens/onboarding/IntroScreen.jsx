import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import Carousel from 'react-native-reanimated-carousel';
import BackButton from '../../components/BackButton';

// Example data for carousel items
const carouselData = [
  { id: 1, image: require('../../assets/images/test.jpg'), text: 'Real Time Updates' },
  { id: 2, image: require('../../assets/images/test.jpg'), text: 'Track your expenses easily.' },
  { id: 3, image: require('../../assets/images/test.jpg'), text: 'Stay on top of your budget.' },
  { id: 4, image: require('../../assets/images/test.jpg'), text: 'Challenge your friends.' },
];

export default function IntroScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { username, userId } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFinish = () => {
    // Handle saving user details to the backend if needed
    navigation.navigate('NavigationBar');
  };

  const renderItem = ({ item }) => (
    <View className="items-center">
      <Image source={item.image} className="h-96 w-full mb-4" resizeMode="contain" />
      <Text className="text-white text-lg">{item.text}</Text>
    </View>
  );

  const renderIndicators = () => (
    <View className="flex-row justify-center mt-4">
      {carouselData.map((_, index) => (
        <View
          key={index}
          className={`h-2 w-2 rounded-full mx-1 ${index === currentIndex ? 'bg-indigo-500' : 'bg-gray-400'}`}
        />
      ))}
    </View>
  );

  return (
    <View className="bg-gray-800 flex-1">
      <BackButton />
      <Text className="text-white text-4xl font-bold mx-4 mt-4 mb-2">Welcome {username}!</Text>
      <Text className="text-gray-400 text-lg m-4">Here’s a short intro on how to use the app.</Text> 
      
      <View className="flex-1 items-center justify-center m-4">
        <Carousel
          loop
          width={300}
          height={500}
          autoPlay
          data={carouselData}
          renderItem={renderItem}
          onSnapToItem={(index) => setCurrentIndex(index)}
          autoPlayInterval={5000}
          className="-mt-4"
        />
        {renderIndicators()}
        
        <TouchableOpacity className="py-3 bg-indigo-500 rounded mt-6 w-40 items-center" onPress={handleFinish}>
          <Text className="text-white">Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
