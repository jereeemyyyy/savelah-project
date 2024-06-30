import { Text, View, TouchableOpacity} from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';

export default function Extensions() {
    return (
        <View className="mb-4 pt-4 bg-white rounded-xl">
            <TouchableOpacity className="justify-between flex-row items-center mx-2 mb-4">
                <View className="flex-row items-center">
                    <FontAwesome name="money" size={24} color="black" />
                    <Text className="text-black mx-5">Expenses Splitter</Text>
                </View>
                <Entypo name="chevron-small-right" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}
