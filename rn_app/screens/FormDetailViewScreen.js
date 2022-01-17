import React, {useState, useEffect} from 'react';

import {StyleSheet, View, Alert, ScrollView} from 'react-native';
import {parseISO, format} from 'date-fns';

import {useAuth} from '../context/AuthContext';
import cuid from 'cuid';

import ViewObject from '../components/ViewObject';
import {Button, IconButton, Text, Spinner} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FormDetailViewScreen = ({navigation, route}) => {
  const {formId} = route.params;
  const {
    currentUser: {
      user: {forms},
    },
    toggleStar,
    markRead,
  } = useAuth();

  const [keysArray, setKeysArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addKeyToArray = key => {
    setKeysArray(prev => [...prev, key]);
  };

  const removeKeyFromArray = () => {
    setKeysArray(prev => prev.slice(0, -1));
  };

  const handleToggleStar = async () => {
    try {
      setIsLoading(true);
      await toggleStar(formId);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    let form = forms.items.find(form => form.key === formId);

    if (!form.form_viewed) {
      markRead(formId);
    }
  }, [formId]);

  const form = forms.items.find(form => form.key === formId);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isLoading ? (
          <Spinner accessibilityLabel="Loading posts" />
        ) : (
          <IconButton
            isDisabled={isLoading}
            icon={
              <Icon
                name={form.star ? 'star' : 'star-outline'}
                size={24}
                onPress={handleToggleStar}
              />
            }
          />
        ),
    });
  }, [navigation, form, isLoading]);

  return (
    <ScrollView style={styles.container}>
      <Text fontSize="lg">
        <Text bold>Recieved at:</Text>
        {format(parseISO(form.created_at), ' dd-MM-yy ')}
        at
        {format(parseISO(form.created_at), ' hh:mm aa')}
      </Text>
      <Text fontSize="lg">
        <Text bold>Form Id: </Text>
        {form.key}
      </Text>
      <Text fontSize="lg">
        <Text bold>Sent To: </Text>
        {form.email}
      </Text>
      <Text fontSize="lg" bold>
        Response
      </Text>
      <View>
        <View style={styles.objKeysViewContainer}>
          <View style={styles.objKeysView}>
            {keysArray.length > 6 && <Text>...</Text>}
            {keysArray.slice(-6).map((key, index) => (
              <Text key={cuid()} fontSize="md" style={{marginLeft: index * 15}}>
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
    marginTop: 20,
  },
  objKeysView: {
    flex: 1,
    backgroundColor: '#CFD8DC',
    marginRight: 10,
  },
});
