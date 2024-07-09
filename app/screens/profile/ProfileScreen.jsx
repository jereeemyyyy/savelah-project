import { Text, View} from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import SignOutButton from './components/SignOutButton';
import Friends from './components/Friends';
import Extensions from './components/Extensions';
import Settings from './components/Settings';
import Profile from './components/Profile';



export default function ProfileScreen() {    

    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
      const getUserData  = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          setUserData(user);
          

        } catch (error) {
          console.error('Error getting user:', error.message);
        }
      }
      getUserData();
    }, []);
  
    return (
        <View className="flex-1 bg-gray-800 p-6">
          <Profile
          userData = {userData}
          />
          <Text className="text-xl font-bold text-white m-1">Settings</Text>
          <Settings
          userData = {userData}
          />
          <Text className="text-xl font-bold text-white m-1">Extensions</Text>
          <Extensions/>
          <Text className="text-xl font-bold text-white m-1">Friends</Text>
          <Friends/>
          <SignOutButton/>
        </View>
      );
}