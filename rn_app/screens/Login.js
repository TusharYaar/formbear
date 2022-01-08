import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import auth from '@react-native-firebase/auth';

import {useAuth} from '../context/AuthContext';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {Button} from 'native-base';

import service from '../android/app/google-services.json';

GoogleSignin.configure({
  webClientId: service.client[0].oauth_client[1].client_id,
});

const Login = () => {
  const {currentUser, signIn} = useAuth();

  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();
    console.log(idToken);
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // return
    auth().signInWithCredential(googleCredential);
    console.log(auth().currentUser);
  }
  const handleLogin = () => {
    signIn('tushar@test.com', 'tushar');
  };

  return (
    <View>
      <Text>Login</Text>

      <Button onPress={onGoogleButtonPress}>Google Login</Button>
      <Button onPress={handleLogin}>handleLogin Login</Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
