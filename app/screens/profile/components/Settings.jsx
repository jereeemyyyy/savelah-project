import { Text, View, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';

export default function Settings() {
    return (
        <View className="mb-4 pt-4 bg-white rounded-xl">
            <TouchableOpacity className="justify-between flex-row items-center mb-4 mx-2">
               <View className="flex-row items-center">
                    <AntDesign name="user" size={24} color="black" />
                    <Text className="text-black mx-5">Ryan Tan</Text>
               </View>
               <Entypo name="chevron-small-right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="justify-between flex-row items-center mb-4 mx-2">
                <View className="flex-row items-center">
                    <Entypo name="email" size={24} color="black" />
                    <Text className="text-black mx-5">ryantan@gmail.com</Text>
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
    );
}