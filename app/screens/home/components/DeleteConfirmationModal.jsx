import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { supabase } from '../../../../lib/supabase';

export default function DeleteConfirmationModal({ task, modalVisible, setModalVisible, fetchTasks }) {
  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('to_do_list')
        .delete()
        .eq('id', task.id);

      if (error) {
        console.error('Error deleting task:', error);
      } else {
        fetchTasks(); // Refresh the tasks
      }
    } catch (error) {
      console.error('Unexpected error deleting task:', error);
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View className="bg-white p-6 rounded-lg shadow-lg">
          <Text className="text-lg font-bold mb-4">Are you sure you want to delete this task?</Text>
          <View className="flex-row justify-end">
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-gray-300 p-3 rounded mr-2"
            >
              <Text className="font-bold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              className="bg-red-500 p-3 rounded"
            >
              <Text className="text-white font-bold">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
