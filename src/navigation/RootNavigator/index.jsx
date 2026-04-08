import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/CommonScreens/WelcomeScreen';
import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/UserScreens/LoginScreen';
import VerificationScreen from '../screens/UserScreens/VerificationScreen';
import LoginErrorScreen from '../screens/UserScreens/LoginErrorScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="LoginError" component={LoginErrorScreen} />
      <Stack.Screen name="AppTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
