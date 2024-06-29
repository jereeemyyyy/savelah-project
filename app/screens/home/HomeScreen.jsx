import { Text, View, SafeAreaView } from 'react-native';
import  ExpensesSummary from '../../components/ExpensesSummary';
import ToDoList from './components/ToDoList';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

export default function HomeScreen() {

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
        <SafeAreaView className="bg-gray-800 flex-1">
            <View className="p-4">
                <Text className="font-bold text-3xl text-white">Expenses This Week</Text>   
            </View>
            <View className="flex-1 -mb-10">
                <ExpensesSummary userId={userId}/>
            </View>    
            <View className="flex-1 -mt-20">
                <ToDoList/>
            </View>  
        </SafeAreaView>
    );  
}   