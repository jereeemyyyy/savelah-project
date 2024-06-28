import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '../../../../lib/supabase'; 

const ConfirmationModal = ({ task, modalVisible, setModalVisible }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error);
            } else {
                setUser(data.user);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (modalVisible && user) {
            fetchCategories(user.id);
        }
    }, [modalVisible, user]);

    const fetchCategories = async (userId) => {
        console.log('Fetching categories for user ID:', userId);
        const { data, error } = await supabase.rpc('get_categories', { user_id: userId });
        if (error) {
            console.error('Error fetching categories:', error);
        } else {
            console.log('Fetched categories:', data);
            setCategories(data);
        }
    };

    const handleConfirm = async () => {
        const { data: categoryData, error: categoryError } = await supabase.rpc('get_category_id', {
            user_id: user.id,
            category: selectedCategory
        });

        if (categoryError) {
            console.error('Error fetching category ID:', categoryError);
            return;
        }

        const { error: insertError } = await supabase
            .from('expenses')
            .insert([{
                description: task.description,
                time: task.time,
                category_id: categoryData,
                expense_amount: task.amount
            }]);

        if (insertError) {
            console.error('Error inserting expense:', insertError);
        } else {
            console.log(`Added task "${task.title}" to confirmation list.`);
            setModalVisible(false);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <View className="flex-1 justify-center items-center mt-6">
                <View className="m-5 bg-white rounded-2xl p-9 items-center shadow-lg">
                    <Text className="mb-4 text-center text-lg">Select Category</Text>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                        style={{ height: 50, width: 150 }}
                    >
                        {categories.map((category, index) => (
                            <Picker.Item key={index} label={category} value={category} />
                        ))}
                    </Picker>
                    <TouchableOpacity
                        onPress={handleConfirm}
                        className="bg-purple-500 p-3 rounded mt-4"
                    >
                        <Text className="text-white font-bold">Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmationModal;
