import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/UserScreens/HomeScreen';
import MyProgramScreen from '../../screens/UserScreens/MyProgramScreen';
import LogInjectionScreen from '../../screens/UserScreens/LogInjectionScreen';
import InjectionLogsScreen from '../../screens/UserScreens/InjectionLogsScreen';
import WeightTrendScreen from '../../screens/UserScreens/WeightTrendScreen';
import MyNPScreen from '../../screens/UserScreens/MyNPScreen';
import UpdateWeightScreen from '../../screens/UserScreens/UpdateWeightScreen';

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
      <Stack.Screen name="InjectionLogs" component={InjectionLogsScreen} />
      <Stack.Screen name="LogInjection" component={LogInjectionScreen} />
      <Stack.Screen name="WeightTrend" component={WeightTrendScreen} />
      <Stack.Screen name="MyNP" component={MyNPScreen} />
      <Stack.Screen name="UpdateWeight" component={UpdateWeightScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
