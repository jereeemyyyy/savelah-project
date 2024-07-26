import { SafeAreaView, Text, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export default function WelcomeScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="bg-gray-800 flex-1" testID="welcomeScreen">
            <View className="flex-1 flex justify-around">
                <View className="items-center -mt-19" testID="imageContainer">
                    <Image 
                        source={require('../../assets/images/savingmoney.png')} 
                        style={{ width: 350, height: 200 }} 
                        testID="welcomeImage"
                    />
                </View>

                <View className="-mt-20" testID="headerTextContainer">
                    <Text className="font-bold text-white text-4xl px-5" testID="headerText">
                        Easiest way to manage your finances!
                    </Text>
                </View>

                <View testID="buttonsContainer">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        className="py-3 bg-gray-500 mx-7 rounded-xl"
                        testID="getStartedButton"
                    >
                        <Text className="text-white font-bold text-center text-xl" testID="getStartedButtonText">
                            Get started
                        </Text>
                    </TouchableOpacity>
                    <View className="flex-row justify-center" testID="loginContainer">
                        <Text className="text-white font-semibold py-3" testID="loginPromptText">
                            Already have an account?
                        </Text>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Login')} 
                            testID="loginButton"
                        >
                            <Text className="text-indigo-500 font-semibold py-3 px-2" testID="loginButtonText">
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
