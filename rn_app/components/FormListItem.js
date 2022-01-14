import React from 'react';

import {StyleSheet, View, Pressable} from 'react-native';

import {IconButton, Text} from 'native-base';

import {parseISO, format} from 'date-fns';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FormListItem = ({form, onLongPress, onPress, onStarPress, isLoading}) => {
  const handleFormClick = () => {
    onPress(form.key);
  };
  const handleToggleStar = () => {
    onStarPress(form.key);
  };

  return (
    <View style={styles.itemContainer}>
      <Pressable
        onLongPress={() => onLongPress(true, form.key)}
        onPress={handleFormClick}>
        <View style={styles.item}>
          <View style={styles.descriptionContainer}>
            <Text fontSize="lg" bold>
              {form.key}
            </Text>
            <Text>{format(parseISO(form.created_at), 'do MM, yyyy')}</Text>
            <Text>{format(parseISO(form.created_at), 'hh:mm aa')}</Text>
            <Text noOfLines={1}>{JSON.stringify(form.form_response)}</Text>
          </View>
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
        </View>
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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionContainer: {
    flex: 1,
    flexGrow: 1,
    maxWidth: '70%',
  },
});
