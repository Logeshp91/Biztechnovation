import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Account/Accounts/Login';
import Loading from '../Account/Accounts/Loading';
import TabNavigation from './TabNavigation';
import DrawerNavigation from './DrawerNavigation';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Loading" component={Loading} />
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;