import React from 'react';
import SignUpScreen from './Screens/SignUp';
import LogInScreen from './Screens/LogIn';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './Navigation/RootNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from "./contexts/AuthContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUpScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="LogInScreen" component={LogInScreen} />
            {/* Add other screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider> 
  );
}  