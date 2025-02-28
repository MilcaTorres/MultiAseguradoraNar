import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../modules/Home';
import Customers from '../modules/Customers';
import Quote from '../modules/Quote';
import Statistics from '../modules/Statistics';
import Profile from '../modules/Profile';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={Home} />
      <Stack.Screen name="Clientes" component={Customers} />
      <Stack.Screen name="Cotizar" component={Quote} />
      <Stack.Screen name="Estadísticas" component={Statistics} />
      <Stack.Screen name="Perfil" component={Profile} />
    </Stack.Navigator>
  );
}