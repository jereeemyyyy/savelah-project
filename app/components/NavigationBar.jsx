import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import ExpensesScreen from '../screens/expenses/ExpensesScreen';
import BudgetsScreen from '../screens/budgets/BudgetsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import LeaderBoardsScreen from '../screens/leaderboards/LeaderBoardsScreen';
import { Ionicons } from '@expo/vector-icons';


export default function NavigationBar() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}> 
            <Tab.Screen name="Home" 
                        component={HomeScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="home" color={color} size={size} />
                            ),
                        }} />
            <Tab.Screen name="Expenses" 
                        component={ExpensesScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="wallet" color={color} size={size} />
                            ),
                        }} />
            <Tab.Screen name="Budgets" 
                        component={BudgetsScreen} 
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="pie-chart" color={color} size={size} />
                            ),
                        }} />
            <Tab.Screen name="LeaderBoards" 
                        component={LeaderBoardsScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="trophy" color={color} size={size} />
                            ),
                        }} />
            <Tab.Screen name="Profile" 
                        component={ProfileScreen} 
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="person" color={color} size={size} />
                            ),
                        }}/>
        </Tab.Navigator>
    );
}