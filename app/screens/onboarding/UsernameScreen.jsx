import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { supabase } from '../../../lib/supabase';

export default function UsernameScreen() {
    const [username, setUsername] = useState('');
    const navigation = useNavigation();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    setUserId(user.id);
                } else {
                    console.log("No user found");
                }
            } catch (error) {
                console.error("Error fetching user:", error.message);
            }
        };

        fetchUser();
    }, []);

    const handleNext = async () => {
        if (username.trim() === '') {
            Alert.alert('Username Required', 'Please enter a username.');
            return;
        }

        const user_Id = userId;
        const { error } = await saveUsername(user_Id, username);

        if (error) {
            console.error('Error saving username:', error);
        } else {
            navigation.navigate('Photo', { username, userId });
        }
    };

    const saveUsername = async (userId, username) => { 
        const { data, error } = await supabase
            .from('profiles')
            .update({ username })
            .eq('id', userId);

        return { data, error };
    };

    return (
        <View className="flex-1 bg-gray-800">
            <Text testID="welcomeText" className="font-bold text-4xl w-72 mt-8 mb-4 mx-4 text-white">Welcome to SaveLah!</Text>
            <Text testID="introText" className="text-lg mx-4 mb-4 text-gray-400">Get started by creating a Username.</Text>

            <View className="flex-1 items-center">
                <TextInput
                    testID="usernameInput"
                    className="p-3 bg-gray-100 rounded mb-4 w-52"
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter Username"
                />
                <TouchableOpacity
                    testID="nextButton"
                    className="py-3 bg-indigo-500 rounded mb-4 w-20 items-center"
                    onPress={handleNext}
                >
                    <Text className="text-white">Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
