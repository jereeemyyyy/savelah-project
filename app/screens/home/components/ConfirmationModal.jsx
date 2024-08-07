import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { supabase } from '../../../../lib/supabase';
import { MaterialIcons } from '@expo/vector-icons';

const ConfirmationModal = ({ task, modalVisible, setModalVisible, fetchTasks }) => {
    const [categories, setCategories] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
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
            if (data.length === 0) {
                Alert.alert('No categories found!', 'Add a new category in the Budgets page.');
                setModalVisible(false);
            } else {
                setCategories(data);
            }
        }
    };

    const handleConfirm = async () => {
        const selectedCategory = categories[selectedIndex.row];
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
        }

        const { error: deleteError } = await supabase
            .from('to_do_list')
            .delete()
            .eq('id', task.id);

        if (deleteError) {
            console.error('Error deleting task:', deleteError);
        } else {
            console.log(`Deleted task with ID ${task.id} from to_do_list.`);
            setModalVisible(false);
        }
        setTimeout(() => {}, 2000); // 2000 milliseconds = 2 seconds
        fetchTasks();
    };

    const handleCloseModal = () => setModalVisible(false);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View className="bg-white rounded-2xl p-10 items-center shadow-lg relative">
                    <TouchableOpacity
                        onPress={handleCloseModal}
                        style={{ position: 'absolute', top: 15, right: 15 }}
                    >
                        <MaterialIcons name="cancel" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="mb-4 text-center text-2xl font-bold">Select Category</Text>
                    <Select
                        selectedIndex={selectedIndex}
                        onSelect={(index) => setSelectedIndex(index)}
                        value={categories[selectedIndex.row]}
                        style={{ height: 50, width: 150 }}
                        className="bg-gray-200 rounded-md"
                    >
                        {categories.map((category, index) => (
                            <SelectItem key={index} title={category} />
                        ))}
                    </Select>
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
