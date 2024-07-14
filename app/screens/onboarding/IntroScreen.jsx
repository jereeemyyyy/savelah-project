import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";

export default function IntroScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { username, bankDetails } = route.params;

    const handleFinish = () => {
        // Handle saving user details to the backend if needed
        navigation.navigate('NavigationBar');
    };

    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-xl mb-4">Welcome to the App, {username}!</Text>
            <Text className="text-lg mb-4">Here’s a short intro on how to use the app.</Text>
            {/* Add intro content here */}
            <TouchableOpacity className="py-3 bg-indigo-500 rounded" onPress={handleFinish}>
                <Text className="text-white">Finish</Text>
            </TouchableOpacity>
        </View>
    );
}
