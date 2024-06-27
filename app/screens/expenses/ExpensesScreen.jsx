import { Text, View } from 'react-native';
import  ExpensesSummary from '../../components/ExpensesSummary';
import  ExpensesCategoryButton from './components/ExpensesCategoryButton';
import { supabase } from '../../../lib/supabase';
import { useEffect, useState } from 'react';


export default function ExpensesScreen() {

    const [userId, setUserId] = useState(null);

    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    setUserId(user.id);
                } else {
                    console.log("No user found");
                }
            } catch (error) {
                console.error("Error fetching user:", error.message);
            }
        };

        fetchUser();
    }, []);
    

    return (
        <View className="justify-start bg-gray-800 flex-1 flex-col">
            <Text className="font-bold text-3xl p-4 text-white">Expenses This Week</Text>   
            <View className="flex-1 -mb-10">
                <ExpensesSummary/>
            </View>  
            <Text className="font-bold text-3xl p-4 text-white -mt-2">Categories</Text>  
            <View className="flex-1">
                <ExpensesCategoryButton userId={userId}/>
            </View>  
        </View>
    );  
}