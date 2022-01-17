import React from 'react';
import {StyleSheet, View, Alert, FlatList} from 'react-native';

import {Button, Text, Avatar, IconButton} from 'native-base';

import {useAuth} from '../context/AuthContext';

import FormListItem from './FormListItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FlatlistItem = ({
  item,
  isLoading,
  formsLoading,
  handleToggleStar,
  handleFormViewNavigation,
  toggleModal,
}) => {
  const {
    currentUser: {user},
    logOut,
  } = useAuth();
  if (item.type === 'userinfo') {
    return (
      <View style={styles.userInfoContainer}>
        <Avatar
          bg="amber.500"
          source={user.photoURL ? {uri: user.photoURL} : null}>
          TU
          <Avatar.Badge bg="green.500" />
        </Avatar>
        <View style={styles.userInfo}>
          {user.displayName && (
            <Text style={styles.userInfoText}>{user.displayName}</Text>
          )}
          <Text style={styles.userInfoText} fontSize="md">
            {user.email}
          </Text>
        </View>
        <IconButton
          icon={<Icon name="logout-variant" size={24} color="black" />}
          isDisabled={isLoading || formsLoading}
          onPress={logOut}
        />
      </View>
    );
  } else {
    return (
      <FormListItem
        form={item}
        onLongPress={toggleModal}
        onPress={handleFormViewNavigation}
        onStarPress={handleToggleStar}
        isLoading={isLoading}
      />
    );
  }
};

export default FlatlistItem;

const styles = StyleSheet.create({
  logoutButton: {
    marginTop: 40,
    marginHorizontal: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  userInfo: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
