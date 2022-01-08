import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Button, FlatList} from 'native-base';

import {useAuth} from '../context/AuthContext';

const FormListView = () => {
  const {
    currentUser: {
      user: {forms},
      isLoading,
      isSignedIn,
    },
    logOut,
  } = useAuth();

  console.log(forms);
  return (
    <View>
      <Button onPress={logOut}>Logout</Button>
      <FlatList
        data={forms.items}
        renderItem={({item}) => <Text>{item.created_at}</Text>}
      />
      <Text>FormListView</Text>
    </View>
  );
};

export default FormListView;

const styles = StyleSheet.create({});
