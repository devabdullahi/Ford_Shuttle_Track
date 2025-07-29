import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SignUpScreen from './Screens/SignUp';
import LogInScreen from './Screens/LogIn';
import MainScreen from './Screens/MainScreen';
import ApprovedStopsScreen from './Screens/ApprovedStopsScreen';
import StopDetailsScreen from './Screens/StopDetailScreen';
import RequestStopScreen from './Screens/RequestStopsScreen';
import MapScreen from './Screens/MapScreen';
import FAQScreen from './Screens/FAQ';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {
      <Stack.Navigator initialRouteName="SignUpScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="LogInScreen" component={LogInScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="ApprovedStops" component={ApprovedStopsScreen} />
        <Stack.Screen name="StopDetails" component={StopDetailsScreen} screenOptions={{ headerShown: false }} />
        <Stack.Screen name="RequestStops" component={RequestStopScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="FAQScreen" component={FAQScreen}/>
      </Stack.Navigator>
      }
    </NavigationContainer>
  );

}