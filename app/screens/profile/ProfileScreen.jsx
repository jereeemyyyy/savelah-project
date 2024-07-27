import { Text, View } from 'react-native';
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
        <View className="flex-1 bg-gray-800 p-6" 
              testID="profileScreen"
        >
          <Profile userData={userData} 
                   testID="profileComponent"
          />
          <Text className="text-xl font-bold text-white m-1" testID="settingsTitle">Settings</Text>
          <Settings userData={userData} 
                    testID="settingsComponent"
          />
          <Text className="text-xl font-bold text-white m-1" testID="extensionsTitle">Extensions</Text>
          <Extensions testID="extensionsComponent"/>
          <Text className="text-xl font-bold text-white m-1" testID="friendsTitle">Friends</Text>
          <Friends testID="friendsComponent"/>
          <SignOutButton testID="signOutButton"/>
        </View>
    );
}
