import { View, Text, TouchableOpacity, FlatList, TextInput, Button, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import { MaterialIcons } from '@expo/vector-icons';

export default function ExpensesModal({selectedItem, visible, onClose}) {

    const [expenses, setExpenses] = useState([]);
    const [budgetAmount, setBudgetAmount] = useState(0);
   
    useEffect(() => {
        const fetchExpenses = async () => {
          if (selectedItem && selectedItem.category) {
            try {
              const { data, error } = await supabase.rpc('get_expenses_by_user_and_category', {
                user_uuid: selectedItem.user_id,
                category_name: selectedItem.category
              });
    
              if (error) {
                throw new Error('Error fetching expenses');
              }
    
              setExpenses(data || []);
              setBudgetAmount(data[0].category_budget);
              
            } catch (error) {
              console.error('Error fetching expenses:', error.message);
            }
          }
        };
    
        if (visible) {
          fetchExpenses();
        } else {
          setExpenses([]);
        }
      }, [visible, selectedItem, selectedItem.user_id]);
    



    const renderItem = ({ item }) => (
        <View className="p-4 border-b border-gray-200 bg-violet-700 rounded-xl mb-2">
        <Text className="text-2xl font-bold text-white">${item.expense_amount}</Text>
        <Text className="text-slate-100">{item.description}</Text>
        <Text className="text-slate-100">{new Date(item.expense_time).toLocaleString()}</Text>
        </View>
    );

    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View className="m-4 bg-white rounded-xl p-6 w-9/12 h-3/4">
                
            <View className="flex-row justify-between items-center mb-0.5">
                <Text className="text-3xl font-bold">{selectedItem.category}</Text>
                <TouchableOpacity onPress={onClose} className="-mt-4">
                  <MaterialIcons name="cancel" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Text className={`text-gray-700 font-bold text-lg mb-2 ${ selectedItem.total_expense <= budgetAmount? 'text-gray-500' : 'text-red-500'}`}>Amount Spent: ${selectedItem.total_expense} /  ${budgetAmount} </Text>

            

                
            {expenses.length > 0 ? (
                <FlatList
                data={expenses}
                renderItem={renderItem}
                keyExtractor={(item) => item.expense_id.toString()}
                
                />
            ) : (
                <Text className="text-gray-600 mb-4">No expenses found for this category.</Text>
            )}
            </View>
            </View>
        </Modal>
  );
}