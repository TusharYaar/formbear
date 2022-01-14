import React from 'react';

import {StyleSheet, View, Pressable} from 'react-native';

import {Text} from 'native-base';

const FormListItem = ({form, onLongPress, onPress}) => {
  const handleFormClick = () => {
    onPress(form.key);
  };

  return (
    <View style={styles.itemContainer}>
      <Pressable
        onLongPress={() => onLongPress(true, form.key)}
        onPress={handleFormClick}>
        <Text fontSize="xl">{form.created_at}</Text>
        <Text noOfLines={1}>{JSON.stringify(form.form_response)}</Text>
      </Pressable>
    </View>
  );
};

export default FormListItem;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});
