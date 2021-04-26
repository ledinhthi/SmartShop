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
import { observer } from 'mobx-react';
import { useStore } from './src/stores/useStore';
const App = observer(() => {
  const { AuthStore } = useStore();
  React.useEffect(async () => {
    console.log("AuthStore.userInfo", AuthStore.userInfo)
  }, [AuthStore.userInfo])
  return (
    <NavigationContainer>
      {AuthStore.userInfo
        ? <Dashboard />
        : <GuestStack />
      }
    </NavigationContainer>
  );
});

export default App;
