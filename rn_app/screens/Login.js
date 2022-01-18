import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import {useAuth} from '../context/AuthContext';

import {Button, Heading, Input, Image, Divider} from 'native-base';
import GoogleButton from '../components/GoogleButton';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Login = ({navigation}) => {
  const {signIn, signInWithGoogle} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password');
      return;
    }

    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', error.message);
    }
  };

  const handleForgotPasswordClick = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleGoogleLoginClick = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      setIsLoading(false);

      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        alt="person walking"
        source={require('../assets/images/login.png')}
        style={styles.image}
      />
      <View style={styles.loginContainer}>
        <Heading>Login</Heading>
        <Input
          value={email}
          onChangeText={e => setEmail(e)}
          variant="underlined"
          placeholder="Email"
          style={styles.input}
          InputLeftElement={<Icon name="email" size={30} />}
        />
        <Input
          value={password}
          variant="underlined"
          onChangeText={e => setPassword(e)}
          placeholder="Password"
          style={styles.input}
          type="password"
          InputLeftElement={<Icon name="lock-outline" size={30} />}
        />
        <View style={styles.forgotBtnContainer}>
          <Button
            variant="ghost"
            onPress={handleForgotPasswordClick}
            colorScheme="blue">
            Forgot Password
          </Button>
        </View>
        <Button
          style={styles.button}
          onPress={handleLogin}
          colorScheme="blue"
          isDisabled={isLoading}
          isLoading={isLoading}>
          Login
        </Button>
        <Divider my="4" />
        <GoogleButton onPress={handleGoogleLoginClick} isLoading={isLoading} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    height: 250,
    resizeMode: 'contain',
  },
  loginContainer: {
    padding: 20,
    flex: 1,
  },
  input: {
    fontSize: 16,
    marginVertical: 10,
  },
  forgotBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    height: 50,
    borderRadius: 10,
  },
});
