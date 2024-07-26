import {  View, Image, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoginCard from "./components/LoginCard";
import BackButton from "../../components/BackButton";


export default function LoginScreen() {
  
    
    return (
        <View className="flex-1 bg-gray-800" testID="loginScreen">
            <SafeAreaView className="flex" >
                <BackButton/>
                <View className="flex-row justify-center align-items-center pl-7 pt-14 pb-14" testID="backButtonContainer">
                    <Image source={require('../../assets/images/logo.png')} 
                           style={{width: 340, height: 55}}/>
                </View>     
            </SafeAreaView>
            <LoginCard testID="loginCard"/>
        </View>
       
    );
}