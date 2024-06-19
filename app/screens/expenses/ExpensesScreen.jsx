import { Text, View } from 'react-native';
import  BackButton  from '../../components/BackButton';
import  ExpensesSummary from '../../components/ExpensesSummary';
import  ExpensesCategoryButton from './components/ExpensesCategoryButton';


export default function ExpensesScreen() {
    return (
        <View className="justify-start bg-gray-800 flex-1 flex-col">
            <Text className="font-bold text-xl p-5 text-white">Expenses This Week</Text>   
            <View className="flex-1">
                <ExpensesSummary/>
            </View>  
            <Text className="font-bold text-xl p-5 text-white">Categories</Text>  
            <View className="flex-1">
                <ExpensesCategoryButton/>
            </View>  
        </View>
    );  
}