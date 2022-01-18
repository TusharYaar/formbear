import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Button, Heading, Input, Image} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useAuth} from '../context/AuthContext';

const ForgotPassword = ({navigation}) => {
  const {forgotPassword} = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      console.log('timeLeft', timeLeft);
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
      } else {
        console.log('edfuasjbnd');
        setTimeLeft(prev => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft]);

  const handlePress = async () => {
    console.log('called');
    if (email.length <= 3)
      return Alert.alert('Error', 'Please enter a valid email');
    try {
      setIsLoading(true);
      await forgotPassword(email);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setTimeLeft(120);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        alt="Person On a wheel chair"
        source={require('../assets/images/forgotPassword.png')}
        style={styles.image}
      />
      <View style={styles.forgotContainer}>
        <Heading>Forgot Password</Heading>
        <View style={styles.inputContainer}>
          <Input
            value={email}
            onChangeText={e => setEmail(e)}
            variant="underlined"
            placeholder="Email"
            style={styles.input}
            InputLeftElement={<Icon name="email" size={30} />}
          />
          <Button
            variant="ghost"
            style={styles.loginBtn}
            colorScheme="blue"
            onPress={() => navigation.goBack()}>
            login
          </Button>
        </View>

        <Button
          style={styles.button}
          onPress={handlePress}
          colorScheme="blue"
          isLoading={isLoading || timeLeft > 0}>
          {timeLeft > 0
            ? `Send again in ${timeLeft} seconds`
            : 'Send Reset Email'}
        </Button>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    height: 250,
    resizeMode: 'contain',
  },
  forgotContainer: {
    padding: 20,
    flex: 1,
  },
  inputContainer: {
    marginVertical: 20,
    flex: 1,
  },
  loginBtn: {
    marginVertical: 10,
    alignSelf: 'flex-end',
  },
  button: {
    height: 50,
    borderRadius: 10,
  },
});
