import { Text, View, TouchableOpacity, Alert, TextInput, Image} from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useNavigation } from 'expo-router';
import { AntDesign, Entypo, FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {

    const navigation = useNavigation();

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

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


    async function handleLogout() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                Alert.alert(error.message);
            } else {
                Alert.alert("User logged out successfully");
                // Reset the navigation stack when logging out
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Welcome' }],
                });
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    }
    
    return (
        <View className="flex-1 bg-gray-800 p-6">
          <View className="flex-row items-center mb-8">
          <TouchableOpacity onPress={pickProfilePicture}>
            {profilePicture ? (
                <Image source={{ uri: profilePicture }} className="w-20 h-20 rounded-full mr-4" />
            ) : (
                <View className="w-20 h-20 bg-gray-200 rounded-full mr-4" />
            )}
         </TouchableOpacity>
            <Text className="text-2xl font-bold text-white">Alexander</Text>
          </View>

          <Text className="text-xl font-bold text-white m-1">Settings</Text>
          <View className="mb-4 pt-4 bg-white rounded-xl">
            <TouchableOpacity className="justify-between flex-row items-center mb-4 mx-2">
               <View className="flex-row items-center">
                    <AntDesign name="user" size={24} color="black" />
                    <Text className="text-black mx-5">Alexander Wang</Text>
               </View>
               <Entypo name="chevron-small-right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="justify-between flex-row items-center mb-4 mx-2">
                <View className="flex-row items-center">
                    <Entypo name="email" size={24} color="black" />
                    <Text className="text-black mx-5">AvaSav@example.com</Text>
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

          <Text className="text-xl font-bold text-white m-1">Extensions</Text>
          <View className="mb-4 pt-4 bg-white rounded-xl">
            <TouchableOpacity className="justify-between flex-row items-center mx-2 mb-4">
                <View className="flex-row items-center">
                    <FontAwesome name="money" size={24} color="black" />
                    <Text className="text-black mx-5">Expense Splitter</Text>
                </View>
                <Entypo name="chevron-small-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
    
          <Text className="text-xl font-bold text-white m-1">Friends</Text>
          <View className="mb-4 pt-4 bg-white rounded-xl">
            <TouchableOpacity className="justify-between flex-row items-center mx-2 mb-4">
                <View className="flex-row items-center">
                    <FontAwesome5 name="user-friends" size={24} color="black" />
                    <Text className="text-black mx-5">Add a Friend</Text>
                </View>
              <Entypo name="chevron-small-right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="justify-between flex-row items-center mx-2 mb-4">
                <View className="flex-row items-center">
                    <FontAwesome6 name="people-group" size={24} color="black" />
                    <Text className="text-black mx-5">Referral</Text>
                </View>
                <Entypo name="chevron-small-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
    
          <TouchableOpacity className="bg-red-500 py-2 rounded-full mt-auto mt-3" onPress={handleLogout}>
            <Text className="text-center text-white font-bold text-lg">Sign Out</Text>
          </TouchableOpacity>
        </View>
      );
}