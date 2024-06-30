import { Text, View, TouchableOpacity} from 'react-native';
import { Entypo, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';

export default function Friends() {
    return (
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
    );
}