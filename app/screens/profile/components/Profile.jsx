import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function Profile({ userData }) {
    const [profilePicture, setProfilePicture] = useState(null);
    const [profileName, setProfileName] = useState(null);

    useEffect(() => {
        if (userData) {
            getProfileName();
        }
    }, [userData]);

    // Get profile name
    const getProfileName = async () => {
        try {
            if (userData && userData.user_metadata) {
                setProfileName(userData.user_metadata.first_name + ' ' + userData.user_metadata.last_name);
            }
        } catch(error) {
            console.error('Error getting user:', error.message);
        }
    } 

    // Allow user to select a profile picture
    const pickProfilePicture = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfilePicture(result.assets[0].uri);
        }
    };

    return (
        <View className="flex-row items-center mb-8">
            <TouchableOpacity onPress={pickProfilePicture}>
                {profilePicture ? (
                    <Image source={{ uri: profilePicture }} className="w-20 h-20 rounded-full mr-4" />
                ) : (
                    <View className="w-20 h-20 bg-gray-200 rounded-full mr-4" />
                )}
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-white">{profileName}</Text>
        </View>
    );
}
