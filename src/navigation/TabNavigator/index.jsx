import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from '../HomeStackNavigator';
import ChatScreen from '../../screens/UserScreens/ChatScreen';
import ProfileScreen from '../../screens/UserScreens/ProfileScreen';
import { Colors } from '../../theme';
import styles from './styles';

// Bottom Navigation SVGs
import ChatDefault from '../../assets/icons/bottom-Nav/chat-default.svg';
import ChatSelected from '../../assets/icons/bottom-Nav/chat-selected.svg';
import HomeDefault from '../../assets/icons/bottom-Nav/home-default.svg';
import HomeSelected from '../../assets/icons/bottom-Nav/home-selected.svg';
import ProfileDefault from '../../assets/icons/bottom-Nav/profile-default.svg';
import ProfileSelected from '../../assets/icons/bottom-Nav/profile-selected.svg';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.tabActive,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ focused, size }) => {
          let IconSize = 24;

          if (route.name === 'Chat') {
            return focused ? <ChatSelected width={IconSize} height={IconSize} /> : <ChatDefault width={IconSize} height={IconSize} />;
          } else if (route.name === 'Home') {
            return focused ? <HomeSelected width={IconSize} height={IconSize} /> : <HomeDefault width={IconSize} height={IconSize} />;
          } else if (route.name === 'Profile') {
            return focused ? <ProfileSelected width={IconSize} height={IconSize} /> : <ProfileDefault width={IconSize} height={IconSize} />;
          }

          return focused ? <HomeSelected width={IconSize} height={IconSize} /> : <HomeDefault width={IconSize} height={IconSize} />;
        },
      })}
    >
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
