import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/formbear_black.png')}
      />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  },
});
