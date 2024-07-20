import { Text, View, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

export default function Settings({ userData }) {
    const [userEmail, setUserEmail] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        if (userData) {
            setUserEmail(userData.email);
            if (userData.user_metadata) {
                setUserName(userData.user_metadata.first_name + ' ' + userData.user_metadata.last_name);
            }
        }
    }, [userData]);

    
    return (
        <View className="mb-4 pt-4 bg-white rounded-xl">
            <TouchableOpacity className="justify-between flex-row items-center mb-4 mx-2">
                <View className="flex-row items-center">
                    <AntDesign name="user" size={24} color="black" />
                    <Text className="text-black mx-5">{userName}</Text>
                </View>
                <Entypo name="chevron-small-right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="justify-between flex-row items-center mb-4 mx-2">
                <View className="flex-row items-center">
                    <Entypo name="email" size={24} color="black" />
                    <Text className="text-black mx-5">{userEmail}</Text>
                </View>
                <Entypo name="chevron-small-right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="justify-between flex-row items-center mx-2 mb-4">
                <View className="flex-row items-center">
                    <AntDesign name="bank" size={24} color="black" />
                    <Text className="text-black mx-5">Edit Bank Account</Text>
                </View>
                <Entypo name="chevron-small-right" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}
