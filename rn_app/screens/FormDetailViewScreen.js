import React, {useState} from 'react';

import {StyleSheet, View, ScrollView} from 'react-native';
import {parseISO, format} from 'date-fns';

import {useAuth} from '../context/AuthContext';

import ViewObject from '../components/ViewObject';
import {Button, Text} from 'native-base';

const FormDetailViewScreen = ({route}) => {
  const {formId} = route.params;
  const {
    currentUser: {
      user: {forms},
    },
  } = useAuth();

  const [keysArray, setKeysArray] = useState([]);

  const addKeyToArray = key => {
    setKeysArray(prev => [...prev, key]);
  };

  const removeKeyFromArray = () => {
    setKeysArray(prev => prev.slice(0, -1));
  };

  const form = forms.items.find(form => form.key === formId);

  return (
    <ScrollView style={styles.container}>
      <Text fontSize="lg">
        Recieved at:
        {format(parseISO(form.created_at), 'dd-MM-yy ')}
        at
        {format(parseISO(form.created_at), ' hh:mm aa')}
      </Text>
      <Text>Form Id: {form.key}</Text>
      <Text>Sent To: {form.email}</Text>
      <Text>Response</Text>
      <View>
        <View style={styles.objKeysViewContainer}>
          <View style={styles.objKeysView}>
            {keysArray.map((key, index) => (
              <Text key={key} style={{marginLeft: index * 15}}>
                {key}
              </Text>
            ))}
          </View>
          <Button
            style={styles.backButton}
            onPress={removeKeyFromArray}
            isDisabled={keysArray.length === 0}>
            Back
          </Button>
        </View>
        <ViewObject
          object={form.form_response}
          keysArray={keysArray}
          addKeyToArray={addKeyToArray}
        />
      </View>
    </ScrollView>
  );
};

export default FormDetailViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backButton: {
    marginTop: 10,
  },
  objKeysViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  objKeysView: {
    flex: 1,
    backgroundColor: '#CFD8DC',
    marginRight: 10,
  },
});
