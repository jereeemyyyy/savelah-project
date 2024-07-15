import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import BackButton from '../../components/BackButton';

export default function IntroScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { username, userId } = route.params;

    const handleFinish = () => {
        // Handle saving user details to the backend if needed
        navigation.navigate('NavigationBar');
    };

    return (
        <View className="bg-gray-800 flex-1">
            <BackButton />
            <Text className="text-white text-4xl font-bold mx-4 mt-4 mb-2 ">Welcome USERNAME!</Text>
            <Text className="text-gray-400 text-lg m-4">Here’s a short intro on how to use the app.</Text>
            {/* Add intro content here */}

            <View className="flex-1 items-center m-4">
                <TouchableOpacity className="py-3 bg-indigo-500 rounded mb-4 w-20 items-center" onPress={handleFinish}>
                            <Text className="text-white">Finish</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}
