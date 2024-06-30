import { Text, View, TouchableOpacity, Alert, TextInput, Image} from 'react-native';
import { supabase } from '../../../../lib/supabase';
import { useNavigation } from 'expo-router';

export default function SignOutButton() {

    const navigation = useNavigation();
    
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
    <TouchableOpacity className="bg-red-500 py-2 rounded-full mt-auto mt-3" onPress={handleLogout}>
            <Text className="text-center text-white font-bold text-lg">Sign Out</Text>
          </TouchableOpacity>
    );
}