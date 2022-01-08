import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../context/AuthContext';

import Login from '../screens/Login';
import LoadingScreen from '../screens/LoadingScreen';
import VerifyScreen from '../screens/VerifyScreen';
import FormListView from '../screens/FormListView';
// import FormDetailViewScreen from '../screens/FormDetailViewScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {
    currentUser: {isLoading, isSignedIn, user},
  } = useAuth();
  console.log(isSignedIn, isLoading);
  if (isLoading) return <LoadingScreen />;

  if (isSignedIn && !isLoading && !user?.emailVerified) {
    return <VerifyScreen />;
  }

  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <>
          <Stack.Screen name="FormListView" component={FormListView} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});