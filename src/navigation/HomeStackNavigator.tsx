import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MyProgramScreen from '../screens/MyProgramScreen';
import LogInjectionScreen from '../screens/LogInjectionScreen';
import WeightTrendScreen from '../screens/WeightTrendScreen';

// We should also export this if other files might need it
export type HomeStackParamList = {
  HomeMain: undefined;
  MyProgram: undefined;
  LogInjection: undefined;
  WeightTrend: undefined;
  // Future screens like MyNP will go here
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

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
