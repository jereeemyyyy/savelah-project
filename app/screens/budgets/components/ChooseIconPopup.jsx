import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, FlatList, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const iconNames = [
    'home',
    'restaurant',
    'car',
    'book',
    'heart',
    'settings',
    'film',
    'game-controller',
    'globe',
    'headset',
    'key',
    'musical-notes',
    'paw',
    'rocket',
    'umbrella',
    'wifi',
    'basketball',
    'camera',
    'cloud',
    'desktop',
    'beer',
    'bus',
    'cube',
    'document',
    'earth',
    'flask',
    'hammer',
    'leaf',
    'moon',
    'pizza',
    'school',
    'train',
    'wallet',
    'watch',
    'wine',
    'airplane',
    'bicycle',
    'cloud-upload',
    'football',
  // Add more icon names as needed
];

const ChooseIconPopup = ({ visible, onIconSelect, onClose }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconPress = (iconName) => {
    setSelectedIcon(iconName);
  };

  const handleConfirm = () => {
    if (selectedIcon && typeof onIconSelect === 'function' && typeof onClose === 'function') {
      onIconSelect(selectedIcon);
      setSelectedIcon(null);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/50">
        <View className="flex-1 justify-center items-center">
          <View className="bg-white h-96 w-80 p-1 rounded-lg">
            <FlatList
              data={iconNames}
              keyExtractor={(item) => item}
              numColumns={5}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleIconPress(item)}
                  className={`p-4 bg-${selectedIcon === item ? 'gray-400' : 'transparent'} rounded-lg ml-1 my-1`}
                >
                  <Ionicons name={item} size={24} color="black" />
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              className="mt-4 p-4 bg-violet-500 rounded-lg mx-2 my-2"
              onPress={handleConfirm}
            >
              <Text className="text-white font-bold text-center">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChooseIconPopup;
