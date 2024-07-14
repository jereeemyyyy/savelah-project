import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";

export default function BankDetailsScreen() {
    const [bankDetails, setBankDetails] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const { username } = route.params;

    const handleNext = () => {
        navigation.navigate('Intro', { username, bankDetails });
    };

    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-xl mb-4">Enter Bank Account Details</Text>
            <TextInput
                className="p-3 bg-gray-100 rounded mb-4"
                value={bankDetails}
                onChangeText={setBankDetails}
                placeholder="Enter Bank Details"
            />
            <TouchableOpacity className="py-3 bg-indigo-500 rounded" onPress={handleNext}>
                <Text className="text-white">Next</Text>
            </TouchableOpacity>
        </View>
    );
}
