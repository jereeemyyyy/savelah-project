import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { supabase } from '../../../lib/supabase';
import BudgetModal from './components/BudgetModal';
import AddCategoryModal from './components/AddCategoryModal';
import TotalBudget from './components/TotalBudget';
import CategoryList from './components/CategoryList';
import AddCategoryButton from './components/AddCategoryButton';


export default function BudgetsScreen() {
  const [budgetGoal, setBudgetGoal] = useState(400);
  const [totalBudget, setTotalBudget] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pressed, setPressed] = useState(null);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchUserCategories(); 
    categoriesListener();
  }, []);

  const categoriesListener = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const subscription = supabase
        .channel('room1')
        .on('postgres_changes', 
          { event: '*', 
            schema: 'public', 
            table: 'categories', 
            filter: `user_id=eq.${user.id}` 
          }, payload => {
            console.log('Change received!', payload);
            fetchUserCategories(); 
          })
          .subscribe();
          
        return () => {
          fetchUserCategories();
        };
      }
    } catch (error) {
        console.error('Error fetching categories:', error.message);
    }
   };   

  const fetchUserCategories = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.rpc('get_user_categories', { p_user_id: user.id });
        if (error) throw error;
        setCategories(data || []);
        updateTotalBudget(data);
        
      } else {
        console.log("No user found");
      }
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
    
  };

  const updateTotalBudget = (categories) => {
    const total = categories.reduce((sum, category) => sum + category.amount, 0);
    setTotalBudget(total);
  };


  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
    setPressed(category.id);
    setBudgetGoal(category.amount);
  };

  const handleBudgetChange = (value) => {
    setBudgetGoal(value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPressed(null);
  }

  // Save the new budget goal (Update)
  const handleSaveNewBudget = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update({ amount: budgetGoal })
        .eq('id', selectedCategory.id);

      if (error) {
        throw new Error('Error updating category');
      }

      setCategories(categories.map(category =>
        category.id === selectedCategory.id ? { ...category, amount: budgetGoal } : category
      ));
    } catch (error) {
      console.error('Error updating category:', error.message);
    }

    setShowModal(false);
  };


  // Deletes a category
  const handleDeleteCategory = async () => {
    try {
      const { data: expenses, error: fetchExpensesError } = await supabase
        .from('expenses')
        .select('*')
        .eq('category_id', selectedCategory.id);
  
      if (fetchExpensesError) {
        console.error('Error fetching expenses:', fetchExpensesError.message);
        return;
      }
  
      if (expenses.length > 0) {
        Alert.alert(
          'Delete Category',
          'This category has associated expenses. Are you sure you want to delete this category and all its associated expenses?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: async () => {
                try {
                  const { error } = await supabase.rpc('delete_category_and_expenses', {
                    p_category_id: selectedCategory.id
                  });
  
                  if (error) {
                    console.error('Error deleting category and expenses:', error.message);
                    return;
                  }
  
                  setCategories(categories.filter((category) => category.id !== selectedCategory.id));
                  setShowModal(false);
                } catch (error) {
                  console.error('Error deleting category and expenses:', error.message);
                }
              },
            },
          ]
        );
      } else {
        const { error } = await supabase.rpc('delete_category_and_expenses', {
          p_category_id: selectedCategory.id
        });
  
        if (error) {
          console.error('Error deleting category:', error.message);
        } else {
          setCategories(categories.filter((category) => category.id !== selectedCategory.id));
          setShowModal(false);
        }
      }
    } catch (error) {
      console.error('Error deleting category:', error.message);
    }
  };

  // Add a new category function
  const handleAddCategory = async (newCategory) => {

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
  
      if (userError) {
        throw new Error('Error fetching user');
      }
  
      if (!user) throw new Error('User not authenticated');
  
      
      // Capitalize the first letter of newCategory.name
      newCategory.name = newCategory.name.charAt(0).toUpperCase() + newCategory.name.slice(1).toLowerCase();
      
      // Check if the category already exists for the user
      const { data: existingCategories, error: fetchError } = await supabase
        .from('categories')
        .select('category')
        .eq('user_id', user.id) 
        .eq('category', newCategory.name);
  
      if (fetchError) {
        console.log(fetchError);
        throw new Error(fetchError);
      }
  
      if (existingCategories && existingCategories.length > 0) {
        alert('This category has already been created');
        return;
      }
  
      const { data, error } = await supabase
        .from('categories')
        .insert({ 
          amount: newCategory.amount, 
          icon: newCategory.icon, 
          category: newCategory.name 
        })
        .select();
  
      if (error) {
        console.log('Error adding category:', error);
      } else {
        setCategories([...categories, ...data]);
        setShowAddCategoryModal(false);
      }
    } catch (error) {
      console.log('Error adding category:', error);
    }
    fetchUserCategories();
  };
  

  return (
    <View className="flex-1 bg-gray-800 p-6">
      <Text className="text-white text-4xl font-bold mt-3 mb-6">
        Set up a monthly budget goal
      </Text>

      <View className="flex-row justify-between mb-6 items-center">
        <TotalBudget totalBudget={totalBudget} />
        <AddCategoryButton onPress={() => setShowAddCategoryModal(true)} />
      </View>
      
    
      <CategoryList 
        categories={categories} 
        pressed={pressed} 
        selectedCategory={selectedCategory}
        handleCategorySelect={handleCategorySelect} 
      />
      
      
      <BudgetModal
      visible={showModal}
      onClose={handleCloseModal}
      budgetGoal={budgetGoal}
      totalBudget={totalBudget}
      onBudgetChange={handleBudgetChange}
      onSave={handleSaveNewBudget}
      onDelete={handleDeleteCategory}
      />

      <AddCategoryModal
        visible={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
        onAddCategory={handleAddCategory}
      />
    </View>
  );
}