import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ProfilePictureScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { username } = route.params;

    const handleNext = () => {
        navigation.navigate('BankDetails', { username });
    };

    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-xl mb-4">Add a Profile Picture</Text>
            {/* Add profile picture upload component here */}
            <TouchableOpacity className="py-3 bg-indigo-500 rounded mb-4" onPress={handleNext}>
                <Text className="text-white">Next</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-3 bg-gray-500 rounded" onPress={handleNext}>
                <Text className="text-white">Skip</Text>
            </TouchableOpacity>
        </View>
    );
}
