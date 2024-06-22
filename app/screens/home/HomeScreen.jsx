import { Text, View, SafeAreaView } from 'react-native';
import  BackButton  from '../../components/BackButton';
import  ExpensesSummary from '../../components/ExpensesSummary';
import ToDoList from './components/ToDoList';

export default function HomeScreen() {
    return (
        <SafeAreaView className="bg-gray-800 flex-1">
            <View className="p-4">
                <Text className="font-bold text-3xl text-white">Expenses This Week</Text>   
            </View>
            <View className="flex-1 -mb-10">
                <ExpensesSummary/>
            </View>    
            <View className="flex-1 -mt-20">
                <ToDoList/>
            </View>  
        </SafeAreaView>
    );  
}   