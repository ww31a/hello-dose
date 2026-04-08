import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientsScreen from '../../screens/NPScreens/PatientsScreen';
import PatientProfileScreen from '../../screens/NPScreens/PatientProfileScreen';

const Stack = createNativeStackNavigator();

const NPPatientsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PatientsList" component={PatientsScreen} />
      <Stack.Screen name="PatientProfile" component={PatientProfileScreen} />
    </Stack.Navigator>
  );
};

export default NPPatientsStackNavigator;
