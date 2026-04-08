import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/UserScreens/HomeScreen';
import MyProgramScreen from '../screens/UserScreens/MyProgramScreen';
import LogInjectionScreen from '../screens/UserScreens/LogInjectionScreen';
import WeightTrendScreen from '../screens/UserScreens/WeightTrendScreen';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeMain"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="MyProgram" component={MyProgramScreen} />
      <Stack.Screen name="LogInjection" component={LogInjectionScreen} />
      <Stack.Screen name="WeightTrend" component={WeightTrendScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
