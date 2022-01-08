/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';

import {AuthProvider, useAuth} from './context/AuthContext';

import AppNavigator from "./navigator/AppNavigator";




const App = () => {

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
