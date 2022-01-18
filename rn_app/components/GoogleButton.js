import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {Image} from 'native-base';

const GoogleButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={require('../assets/images/google.png')}
        size="xs"
        alt="google image"
        style={styles.image}
      />
      <Text style={styles.text}>Login with Google</Text>
    </TouchableOpacity>
  );
};

export default GoogleButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F1F6F7',
    width: '100%',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
