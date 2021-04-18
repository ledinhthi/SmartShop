/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 * Redux, navigation
 */

import React from 'react';
import {
} from 'react-native';

import { GuestStack } from './src/navigation/GuestNavigation'
import { Dashboard } from './src/navigation/AppNavigation'
import { NavigationContainer } from '@react-navigation/native'
const App = () => {
  return (
    <NavigationContainer>
      <Dashboard />
    </NavigationContainer>
  );
};

export default App;
