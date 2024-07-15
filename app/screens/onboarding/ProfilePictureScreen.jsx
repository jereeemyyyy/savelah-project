import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import BackButton from '../../components/BackButton';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../../lib/supabase';
import { useState } from 'react';


export default function ProfilePictureScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { username, userId } = route.params;
    const [profilePicture, setProfilePicture] = useState(null);

    const handleNext = () => {
        navigation.navigate('BankDetails', { username, userId });
    };

    const pickImage = async () => {
        // Ask the user for permission to access the gallery
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        // Launch image picker
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const { uri } = result.assets[0];
            console.log('Selected image URI:', uri);

            try {
                // Convert image to blob
                const response = await fetch(uri);
                const blob = await response.blob();
                console.log('Image Blob:', blob);

                // Create file path and name
                const fileExt = uri.split('.').pop();
                const fileName = `${userId}.${fileExt}`;
                const filePath = `${fileName}`;

                // Create a file object for Supabase upload
                const file = new File([blob], fileName, { type: blob.type });
                
                // Upload the image to Supabase storage
                const { error } = await supabase.storage
                    .from('profile-pictures')
                    .upload(filePath, file, {
                        cacheControl: '3600',
                        upsert: true
                    });

                if (error) {
                    console.error('Error uploading image:', error);
                    alert('Error uploading image.');
                } else {
                    const { data } = supabase.storage
                        .from('profile-pictures')
                        .getPublicUrl(filePath);

                    console.log('Public URL:', data.publicUrl);
                    setProfilePicture(data.publicUrl);
                }
            } catch (error) {
                console.error('Error fetching image URI:', error);
                alert('Error fetching image URI.');
            }
        }
    };

    return (
        <View className="flex-1 bg-gray-800">
            <BackButton />
            <Text className="text-4xl font-bold text-white m-4">Add a Profile Picture</Text>
            <Text className="text-lg text-gray-400 mx-4 my-2">Customize your profile by adding a Profile Picture!</Text>
            <TouchableOpacity className="items-center my-4 ml-5" onPress={pickImage}>
                {profilePicture ? (
                    <Image source={{ uri: profilePicture }} className="w-20 h-20 rounded-full" />
                ) : (
                    <View className="w-20 h-20 bg-gray-200 rounded-full mr-4" />
                )}
            </TouchableOpacity>

            <View className="flex-1 items-center m-4">
                <TouchableOpacity className="py-3 bg-indigo-500 rounded mb-4 w-20 items-center" onPress={handleNext}>
                    <Text className="text-white">Next</Text>
                </TouchableOpacity>
                <TouchableOpacity className="py-3 bg-gray-500 rounded w-20 items-center" onPress={handleNext}>
                    <Text className="text-white">Skip</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
