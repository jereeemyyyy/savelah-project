import { supabase } from '../../../../lib/supabase';
import { format } from 'date-fns';

const formatDate = (date) => format(date, 'yyyy-MM-dd');

export const updateLoginStreak = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_logins')
      .select('last_login_date, login_streak')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      // Handle other errors
      throw error;
    }

    const today = new Date();
    const todayStr = formatDate(today);

    if (data) {
      const { last_login_date, login_streak } = data;
      const lastLoginDate = new Date(last_login_date);
      const differenceInDays = Math.floor((today - lastLoginDate) / (1000 * 60 * 60 * 24));

      if (differenceInDays === 1) {
        // Last login was yesterday, increase streak
        await supabase
          .from('user_logins')
          .update({ last_login_date: todayStr, login_streak: login_streak + 1 })
          .eq('id', userId);
      } else if (differenceInDays > 1) {
        // Last login was two or more days ago, reset streak
        await supabase
          .from('user_logins')
          .update({ last_login_date: todayStr, login_streak: 1 })
          .eq('id', userId);
      }
      // If differenceInDays === 0, do nothing (already logged in today)
    } else {
      // No previous login record, create a new one
      await supabase
        .from('user_logins')
        .insert({ user_id: userId, last_login_date: todayStr, login_streak: 1 });
    }
  } catch (error) {
    console.error('Error updating login streak:', error.message);
  }
};