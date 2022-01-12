import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useAuth} from '../context/AuthContext';

import {Button} from 'native-base';

const Login = () => {
  const {currentUser, signIn, signInWithGoogle} = useAuth();

  const handleLogin = () => {
    signIn('tusharagrawal16@rediffmail.com', 'tushar');
  };

  return (
    <View>
      <Text>Login</Text>

      <Button onPress={signInWithGoogle}>Google Login</Button>
      <Button onPress={handleLogin}>handleLogin Login</Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
