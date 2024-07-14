import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";

export default function UsernameScreen() {
    const [username, setUsername] = useState('');
    const navigation = useNavigation();

    const handleNext = () => {
        navigation.navigate('Photo' ,{ username });
    };

    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-xl mb-4">Choose a Username</Text>
            <TextInput
                className="p-3 bg-gray-100 rounded mb-4"
                value={username}
                onChangeText={setUsername}
                placeholder="Enter Username"
            />
            <TouchableOpacity className="py-3 bg-indigo-500 rounded" onPress={handleNext}>
                <Text className="text-white">Next</Text>
            </TouchableOpacity>
        </View>
    );
}
