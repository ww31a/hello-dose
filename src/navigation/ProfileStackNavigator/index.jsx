import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../../screens/UserScreens/ProfileScreen';
import MyProgramScreen from '../../screens/UserScreens/MyProgramScreen';
import MyNPScreen from '../../screens/UserScreens/MyNPScreen';
import InjectionLogsScreen from '../../screens/UserScreens/InjectionLogsScreen';
import LogInjectionScreen from '../../screens/UserScreens/LogInjectionScreen';
import WeightTrendScreen from '../../screens/UserScreens/WeightTrendScreen';
import UpdateWeightScreen from '../../screens/UserScreens/UpdateWeightScreen';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileMain"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="MyProgram" component={MyProgramScreen} />
      <Stack.Screen name="MyNP" component={MyNPScreen} />
      <Stack.Screen name="InjectionLogs" component={InjectionLogsScreen} />
      <Stack.Screen name="LogInjection" component={LogInjectionScreen} />
      <Stack.Screen name="WeightTrend" component={WeightTrendScreen} />
      <Stack.Screen name="UpdateWeight" component={UpdateWeightScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
