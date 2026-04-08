import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../../screens/CommonScreens/WelcomeScreen';
import TabNavigator from '../TabNavigator';
import NPTabNavigator from '../NPTabNavigator';
import LoginScreen from '../../screens/UserScreens/LoginScreen';
import VerificationScreen from '../../screens/UserScreens/VerificationScreen';
import LoginErrorScreen from '../../screens/UserScreens/LoginErrorScreen';
import ScheduleAppointmentScreen from '../../screens/UserScreens/ScheduleAppointmentScreen';
import SelectTimeSlotScreen from '../../screens/UserScreens/SelectTimeSlot';
import NPLoginScreen from '../../screens/NPScreens/NPLoginScreen';
import ManageScheduleScreen from '../../screens/NPScreens/ManageScheduleScreen';

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
      <Stack.Screen name="NPTabs" component={NPTabNavigator} />
      <Stack.Screen name="ScheduleAppointment" component={ScheduleAppointmentScreen} />
      <Stack.Screen name="SelectTimeSlot" component={SelectTimeSlotScreen} />
      <Stack.Screen name="NPLogin" component={NPLoginScreen} />
      <Stack.Screen name="ManageSchedule" component={ManageScheduleScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
