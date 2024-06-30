import { Text, View, TouchableOpacity, Alert, TextInput, Image} from 'react-native';
import SignOutButton from './components/SignOutButton';
import Friends from './components/Friends';
import Extensions from './components/Extensions';
import Settings from './components/Settings';
import Profile from './components/Profile';

export default function ProfileScreen() {    
    return (
        <View className="flex-1 bg-gray-800 p-6">
          <Profile/>
          <Text className="text-xl font-bold text-white m-1">Settings</Text>
          <Settings/>
          <Text className="text-xl font-bold text-white m-1">Extensions</Text>
          <Extensions/>
          <Text className="text-xl font-bold text-white m-1">Friends</Text>
          <Friends/>
          <SignOutButton/>
        </View>
      );
}