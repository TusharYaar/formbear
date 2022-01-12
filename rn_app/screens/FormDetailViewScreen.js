import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

import {useAuth} from '../context/AuthContext';

const FormDetailViewScreen = ({navigation, route}) => {
  const {formId} = route.params;
  const {
    currentUser: {
      user: {forms},
    },
  } = useAuth();

  const form = forms.items.find(form => form.key === formId);
  return (
    <View>
      <Text>{JSON.stringify(form.form_response)}</Text>
    </View>
  );
};

export default FormDetailViewScreen;

const styles = StyleSheet.create({});
