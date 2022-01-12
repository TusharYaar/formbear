import React from 'react';

import {StyleSheet, View, Alert} from 'react-native';
import {Button, Heading, Text} from 'native-base';

import {useAuth} from '../context/AuthContext';

const VerifyScreen = () => {
  const {verifyEmail, logOut, checkEmailVerified} = useAuth();

  const handleVerify = async () => {
    try {
      verifyEmail();
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Heading>Verify Email</Heading>
      <Text>
        We need to verify your email, to make sure that your form data reaches
        to only you
      </Text>
      <Button onPress={logOut}>Logout</Button>

      <Button onPress={checkEmailVerified}>Check Email Verified</Button>

      <Button onPress={handleVerify}>Verify Email</Button>
    </View>
  );
};

export default VerifyScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
