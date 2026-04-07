import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Platform } from 'react-native';
import { MessageSquare, Home, UserCircle } from 'lucide-react-native';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Colors, Typography } from '../theme';

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
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent;

          if (route.name === 'Chat') {
            IconComponent = MessageSquare;
          } else if (route.name === 'Home') {
            IconComponent = Home;
          } else if (route.name === 'Profile') {
            IconComponent = UserCircle;
          } else {
            IconComponent = Home; // Fallback
          }

          return (
            <IconComponent
              size={24}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
              fill={focused ? color : 'none'}
            />
          );
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
        component={HomeScreen} 
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

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tabBackground,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: Platform.OS === 'ios' ? 88 : 70,
    paddingBottom: Platform.OS === 'ios' ? 30 : 12,
    paddingTop: 12,
    borderTopWidth: 0,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 20,
  },
  tabBarLabel: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: 12,
    marginTop: 4,
  },
});

export default TabNavigator;
