import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';

import {Button, FlatList, Modal} from 'native-base';

import {useAuth} from '../context/AuthContext';
import FormListItem from '../components/FormListItem';

const FormListView = ({navigation}) => {
  const {
    currentUser: {
      user: {forms},
    },
    getForms,
    logOut,
  } = useAuth();

  const [formsLoading, setFormsLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const handleFormViewNavigation = formId => {
    console.log(formId);
    setMenuVisible(false);
    navigation.navigate('FormDetailView', {formId});
  };

  const showMenu = () => {
    setMenuVisible(true);
    console.log('menuVisible', menuVisible);
  };

  const refreshForms = async () => {
    try {
      setFormsLoading(true);
      await getForms();
      setFormsLoading(false);
    } catch (error) {
      Alert.alert('ERror', error.message);
    }
  };
  return (
    <View>
      <Modal
        isOpen={menuVisible}
        onClose={() => setMenuVisible(false)}
        size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Options</Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer>
            <Button onPress={() => setMenuVisible(false)}>Close</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <FlatList
        data={[...forms.items, {type: 'logout'}]}
        refreshing={formsLoading}
        onRefresh={refreshForms}
        renderItem={({item}) =>
          item.type === 'logout' ? (
            <Button style={styles.logoutButton} onPress={logOut}>
              Logout
            </Button>
          ) : (
            <FormListItem
              form={item}
              onLongPress={showMenu}
              onPress={handleFormViewNavigation}
            />
          )
        }
      />
    </View>
  );
};

export default FormListView;

const styles = StyleSheet.create({
  logoutButton: {
    marginTop: 40,
    marginHorizontal: 10,
  },
});
