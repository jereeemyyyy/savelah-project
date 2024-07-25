import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import BackButton from '../../components/BackButton';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../../lib/supabase';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfilePictureScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { username, userId } = route.params;
    const [profilePicture, setProfilePicture] = useState(null);

    const handleNext = () => {
        navigation.navigate('BankDetails', { username, userId });
    };

    const pickProfilePicture = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const source = result.assets[0];
            const fileExt = source.uri.split('.').pop();
            const fileName = `${userId}.${fileExt}`;
            const filePath = `profile-pictures/${fileName}_${Date.now()}`;

            const formData = new FormData();
            formData.append('file', {
                uri: source.uri,
                name: fileName,
                type: `image/${fileExt}`
            });

            let { error: uploadError } = await supabase.storage
                .from('profile-pictures')
                .upload(filePath, formData);

            if (uploadError) {
                console.error('Error uploading image:', uploadError.message);
                Alert.alert('Error', 'Failed to upload profile picture');
                return;
            }

            const { data: imageUrl } = await supabase.storage
                .from('profile-pictures')
                .getPublicUrl(filePath);

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ profile_picture: imageUrl.publicUrl })
                .eq('id', userId);

            if (updateError) {
                console.error('Error updating profile picture:', updateError.message);
            } else {
                setProfilePicture(imageUrl.publicUrl);
            }
        }
    }; 

    return (
        <View className="flex-1 bg-gray-800">
            <BackButton />
            <Text className="text-4xl font-bold text-white m-4">Add a Profile Picture</Text>
            <Text className="text-lg text-gray-400 mx-4 my-2">Customize your profile by adding a Profile Picture!</Text>
            <TouchableOpacity className="items-center my-4" onPress={pickProfilePicture}>
                {profilePicture ? (
                    <Image source={{ uri: profilePicture }} className="w-36 h-36 rounded-full" />
                ) : (
                    <View className="w-36 h-36 bg-gray-200 rounded-full items-center justify-center">
                        <MaterialIcons name="add-a-photo" size={24} color="black"/>
                    </View>
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
