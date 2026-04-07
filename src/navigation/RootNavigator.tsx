import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/LoginScreen';
import VerificationScreen from '../screens/VerificationScreen';
import LoginErrorScreen from '../screens/LoginErrorScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Verification: { email: string };
  LoginError: { email: string };
  AppTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
