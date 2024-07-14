import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/startpage/WelcomeScreen';
import LoginScreen from './screens/startpage/LoginScreen';
import SignUpScreen from './screens/startpage/SignUpScreen'
import NavigationBar from './components/NavigationBar';
import UsernameScreen from './screens/onboarding/UsernameScreen';
import ProfilePictureScreen from './screens/onboarding/ProfilePictureScreen';
import BankDetailsScreen from './screens/onboarding/BankDetailsScreen';
import IntroScreen from './screens/onboarding/IntroScreen';

export default function App() {

  const stack = createNativeStackNavigator();


  return ( 
      <stack.Navigator initialRouteName='Welcome'>
          <stack.Screen name="NavigationBar" options={{headerShown: false}} component={NavigationBar} />
          <stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
          <stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} /> 
          <stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
          <stack.Screen name="Username" options={{headerShown: false}} component={UsernameScreen}/>
          <stack.Screen name="Photo" options={{headerShown: false}} component={ProfilePictureScreen}/>
          <stack.Screen name="BankDetails" options={{headerShown: false}} component={BankDetailsScreen}/>
          <stack.Screen name="Intro" options={{headerShown: false}} component={IntroScreen}/>
      </stack.Navigator>
  );
}