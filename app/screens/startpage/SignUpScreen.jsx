import { Text, View, SafeAreaView } from "react-native";
import BackButton from "../../components/BackButton";
import RegistrationCard from "./components/RegistrationCard";

export default function SignUpScreen() { 
    return (
        <View className="flex-1 bg-gray-800" testID="signUpScreen">
            <SafeAreaView className="flex">
                <View className="flex-row justify-start" testID="backButtonContainer">
                    <BackButton testID="backButton"/>
                </View>
                <View className="flex-row pl-7 pt-8" testID="registrationHeader">
                    <Text className="text-white font-bold text-5xl text-left" testID="registrationHeaderText">
                        Registration
                    </Text>   
                </View>     
                <View className="flex-row pl-7 pb-10" testID="createAccountTextContainer">
                    <Text className="text-gray-400 font-bold text-sm text-left" testID="createAccountText">
                        Create an account to continue
                    </Text>   
                </View> 
            </SafeAreaView>
            <RegistrationCard testID="registrationCard"/> 
        </View>
    );
}
