import { Text, View } from 'react-native';
import  BackButton  from '../../components/BackButton';
import  ExpensesSummary from './components/ExpensesSummary';

export default function HomeScreen() {
    return (
        <View className="justify-start bg-gray-800 flex-1 flex-col">
            <Text className="font-bold text-xl p-5 text-white">Home Screen</Text>   
            <View className="flex-1">
                <ExpensesSummary/>
            </View>  
            <Text className="font-bold text-xl p-5 text-white">To Do List</Text>   
        </View>
    );  
    
}