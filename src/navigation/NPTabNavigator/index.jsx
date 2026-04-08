import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../../theme';
import styles from './styles';

// Screens
import NPChatScreen from '../../screens/NPScreens/NPChatScreen';
import NPHomeScreen from '../../screens/NPScreens/NPHomeScreen';
import PatientsScreen from '../../screens/NPScreens/PatientsScreen';
import NPProfileScreen from '../../screens/NPScreens/NPProfileScreen';

// SVGs
import ChatDefault from '../../assets/icons/bottom-Nav/chat-default.svg';
import ChatSelected from '../../assets/icons/bottom-Nav/chat-selected.svg';
import HomeDefault from '../../assets/icons/bottom-Nav/home-default.svg';
import HomeSelected from '../../assets/icons/bottom-Nav/home-selected.svg';
import PatientsDefault from '../../assets/icons/bottom-Nav/patients-default.svg';
import PatientsSelected from '../../assets/icons/bottom-Nav/patients-selected.svg';
import ProfileDefault from '../../assets/icons/bottom-Nav/profile-default.svg';
import ProfileSelected from '../../assets/icons/bottom-Nav/profile-selected.svg';

const Tab = createBottomTabNavigator();

const NPTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.tabActive,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ focused }) => {
          const IconSize = 24;

          if (route.name === 'Chat') {
            return focused ? <ChatSelected width={IconSize} height={IconSize} /> : <ChatDefault width={IconSize} height={IconSize} />;
          } else if (route.name === 'Home') {
            return focused ? <HomeSelected width={IconSize} height={IconSize} /> : <HomeDefault width={IconSize} height={IconSize} />;
          } else if (route.name === 'Patients') {
            return focused ? <PatientsSelected width={IconSize} height={IconSize} /> : <PatientsDefault width={IconSize} height={IconSize} />;
          } else if (route.name === 'Profile') {
            return focused ? <ProfileSelected width={IconSize} height={IconSize} /> : <ProfileDefault width={IconSize} height={IconSize} />;
          }

          return null;
        },
      })}
    >
      <Tab.Screen
        name="Chat"
        component={NPChatScreen}
        options={{ tabBarLabel: 'Chat' }}
      />
      <Tab.Screen
        name="Home"
        component={NPHomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Patients"
        component={PatientsScreen}
        options={{ tabBarLabel: 'Patients' }}
      />
      <Tab.Screen
        name="Profile"
        component={NPProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default NPTabNavigator;
