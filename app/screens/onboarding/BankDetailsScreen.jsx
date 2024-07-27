import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import BackButton from '../../components/BackButton';
import { supabase } from '../../../lib/supabase';

export default function BankDetailsScreen() {
    const [bankDetails, setBankDetails] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const { username, userId } = route.params;

    const handleNext = async () => {
        // Call the function to save the username
        const { error } = await addBankDetails(userId, bankDetails);

        if (error) {
            console.error('Error saving username:', error);
        } else {
            navigation.navigate('Intro', { username, userId });
        }
    };

    const addBankDetails = async (userId, bankDetails) => {
        const { data, error } = await supabase
            .from('profiles')
            .update({ bankDetails })
            .eq('id', userId);

        return { data, error };
    };

    return (
        <View className="bg-gray-800 flex-1">
            <BackButton testID="backButton" />
            <Text testID="headerText" className="font-bold text-white text-4xl m-4">Enter Bank Account Details</Text>
            <Text testID="descriptionText" className="text-lg text-gray-400 mx-4 mb-4">Receive real time updates to update your expenses whenever you make a payment.</Text>

            <View className="flex-1 items-center m-5">
                <TextInput
                    testID="bankDetailsInput"
                    className="p-3 bg-gray-100 rounded mb-4 w-52"
                    value={bankDetails}
                    onChangeText={setBankDetails}
                    placeholder="Enter Bank Details"
                />
                <TouchableOpacity testID="nextButton" className="py-3 bg-indigo-500 rounded mb-4 w-20 items-center" onPress={handleNext}>
                    <Text className="text-white">Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
