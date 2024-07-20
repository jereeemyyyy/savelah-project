import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../../../lib/supabase';    

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
            if (userData && userData.id) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('username')
                    .eq('id', userData.id)
                    .single();

                if (error) {
                    console.error('Error fetching profile:', error.message);
                } else if (data) {
                    setProfileName(data.username);
                }
            }
        } catch (error) {
            console.error('Error getting user:', error.message);
        }
    };

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
