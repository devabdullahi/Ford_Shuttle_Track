import React from 'react';
import SignUpScreen from './Screens/SignUp';
import LogInScreen from './Screens/LogIn';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './Navigation/RootNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <SignUpScreen />
    </NavigationContainer> 
  );
}  