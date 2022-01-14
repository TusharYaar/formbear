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
  const [modal, setModal] = useState({
    formId: '',
    visible: false,
  });
  const handleFormViewNavigation = formId => {
    console.log(formId);
    setModal(false);
    navigation.navigate('FormDetailView', {formId});
  };

  const toggleModal = (visible, formId = '') => {
    setModal({formId, visible});
    console.log('menuVisible', modal);
  };

  const refreshForms = async () => {
    try {
      setFormsLoading(true);
      await getForms();
      setFormsLoading(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  return (
    <View>
      <Modal
        isOpen={modal.visible}
        onClose={() => toggleModal(false, '')}
        size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Options</Modal.Header>
          <Modal.Body></Modal.Body>
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
              onLongPress={toggleModal}
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
