import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../modules/Home';
import Customers from '../modules/Customers';
import Quote from '../modules/Quote';
import Statistics from '../modules/Statistics';
import Profile from '../modules/Profile';
import Login from '../modules/Login';
import BottomTabNavigator from './BottomTabNavigator';
//Agregué esta importación
import HolderData from '../modules/HolderData';
import Insurence from '../modules/Insurence';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
      <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Stack.Screen name="Inicio" component={Home} options={{headerShown: false}} />
      <Stack.Screen name="Clientes" component={Customers} options={{headerShown: false}}/>
      <Stack.Screen name="Cotizar" component={Quote} options={{headerShown: false}}/>
      <Stack.Screen name="Estadísticas" component={Statistics} options={{headerShown: false}}/>
      <Stack.Screen name="Perfil" component={Profile} options={{headerShown: false}}/>
      <Stack.Screen name='MainApp' component={BottomTabNavigator} options={{headerShown: false}}/>

      
      <Stack.Screen name="DatosTitular" component={HolderData} options={{headerShown: false}}/>
      <Stack.Screen name="Seguros" component={Insurence} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}