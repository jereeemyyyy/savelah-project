import { Text, View, TouchableOpacity, Image, Modal, TextInput, Button, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../../../lib/supabase'; 
import { MaterialIcons } from '@expo/vector-icons'; 

export default function Profile({ userData }) {
    const [profilePicture, setProfilePicture] = useState(null);
    const [profileName, setProfileName] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [newProfileName, setNewProfileName] = useState('');

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

    // Update profile name
    const updateProfileName = async () => {

        if (!newProfileName) {
            Alert.alert('Invalid Input', 'Please enter a new profile name');
            return;
        }


        try {
            const { error } = await supabase
                .from('profiles')
                .update({ username: newProfileName })
                .eq('id', userData.id);

            if (error) {
                console.error('Error updating profile:', error.message);
            } else {
                setProfileName(newProfileName);
                setModalVisible(false);
            }
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setNewProfileName('');
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
            <View>
                <Text className="text-2xl font-bold text-white">{profileName}</Text>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="absolute top-4 -right-5"
                >
                    <MaterialIcons name="edit" size={20} color="gray" />
                </TouchableOpacity>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View className="flex-1 justify-center items-center bg-black bg-opacity-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View className="bg-white rounded-2xl p-10 items-center">
                        <Text className="text-2xl font-bold mb-4">Edit Profile Name</Text>
                        <TouchableOpacity
                            onPress={handleCloseModal}
                            style={{ position: 'absolute', top: 15, right: 15 }}
                            className=""
                          
                        >
                            <MaterialIcons name="cancel" size={24} color="black" />
                        </TouchableOpacity>
                        <TextInput
                            value={newProfileName}
                            onChangeText={setNewProfileName}
                            placeholder="Enter new profile name"
                            className="w-56 h-10 border border-gray-300 rounded px-3 mb-3"
                        />
                        <TouchableOpacity
                            className="bg-purple-500 p-2 rounded my-2 w-40 items-center"
                            onPress={updateProfileName}
                        >
                            <Text className="text-white text-base">Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-red-500 p-2 rounded my-2 w-40 items-center"
                            onPress={handleCloseModal}
                        >
                            <Text className="text-white text-base">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
