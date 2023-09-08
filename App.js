import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Detalhes from './src/screens/Detalhes';
import PageExtra from './src/screens/PageExtra';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Login">
        <Stack.Screen name = "Login" component = {Login} />
        <Stack.Screen name = "Home" component = {Home} />
        <Stack.Screen name = "Detalhes" component = {Detalhes} />
        <Stack.Screen name = "Extra" component = {PageExtra} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
