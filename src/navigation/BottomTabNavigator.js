import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../modules/Profile';
import { Ionicons } from '@expo/vector-icons';
import Customers from '../modules/Customers';
import Quote from '../modules/Quote';
import Statistics from '../modules/Statistics';
import HomeScreen from '../modules/Home';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Customers') {
            iconName = 'person';
          } else if (route.name === 'Quote') {
            iconName = 'person';
          } else if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Statistics') {
            iconName = 'person';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Customers"
        component={Customers}
        options={{ headerShown: false, title: 'Clientes' }}
      />
      <Tab.Screen
        name="Quote"
        component={Quote}
        options={{ headerShown: false, title: 'Cotizar' }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, title: 'Inicio' }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{ headerShown: false, title: 'Estadísticas' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{ headerShown: false, title: 'Perfil' }}
        />
    </Tab.Navigator>
  );
}