import { Text, View, FlatList } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome6 } from '@expo/vector-icons';


const Tab = createMaterialTopTabNavigator();

// Mock data for testing
const leaderboardData = [
    { id: '1', name: 'User1', score: 100 },
    { id: '2', name: 'User2', score: 95 },
    { id: '3', name: 'User3', score: 90 },
    { id: '4', name: 'User4', score: 85 },
    { id: '5', name: 'User5', score: 80 },
  ];

export default function LeaderBoardsScreen() {
 
    const renderItem = ({ item }) => (
        <View className='flex-row justify-between 
                         items-center p-4 bg-gray-100
                         border-b border-gray-200 mt-2
                         rounded-2xl'>
            <View className='flex-row'>
                <Text className='text-lg font-bold'>{item.id}.  </Text>
                <Text className='text-lg font-bold'>{item.name}</Text>
            </View>

            <View className='flex-row bg-zinc-800 rounded-xl px-2 py-1'>
                <FontAwesome6 name="gripfire" size={24} color="white" />
                <Text className='text-l mt-1 ml-2 font-bold text-white'>{item.score}</Text>
            </View>
            
        </View>
      );

    return (
        <View className='flex-1 bg-gray-800'>
            <Text className='text-3xl font-bold p-4 text-left text-white'>Leaderboard</Text>
            <FlatList
                data={leaderboardData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
    </View>
    );
}
    
