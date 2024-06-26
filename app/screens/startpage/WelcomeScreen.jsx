import { SafeAreaView, Text, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export default function WelcomeScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaView className="bg-gray-800 flex-1" >
            <View className="flex-1 flex justify-around">
                <View className="items-center -mt-19">
                    <Image source={require('../../assets/images/savingmoney.png')} 
                           style={{width: 350, height: 200}}/>
                </View>

                <View className="-mt-20">
                    <Text className="font-bold text-white text-4xl px-5">
                            Easiest way to manage your finances!
                    </Text>
                </View>
                        

                <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        className="py-3 bg-gray-500 mx-7 rounded-xl">
                        <Text className="text-white font-bold text-center text-xl">
                            Get started
                        </Text>
                    </TouchableOpacity>
                    <View className="flex-row justify-center">
                        <Text className="text-white font-semibold py-3">
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text className="text-indigo-500 font-semibold py-3 px-2">
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    );
}