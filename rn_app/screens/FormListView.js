import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';

import {Button, FlatList, Modal} from 'native-base';

import {useAuth} from '../context/AuthContext';
import FormListItem from '../components/FormListItem';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FormListView = ({navigation}) => {
  const {
    currentUser: {
      user: {forms},
    },
    toggleStar,
    getForms,
    logOut,
    deleteForm,
  } = useAuth();

  const [formsLoading, setFormsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({
    formId: '',
    visible: false,
  });
  const handleFormViewNavigation = formId => {
    setModal(false);
    navigation.navigate('FormDetailView', {formId});
  };

  const toggleModal = (visible, formId = '') => {
    setModal({formId, visible});
  };

  const handleToggleStar = async formId => {
    try {
      setIsLoading(true);
      setModal({formId: '', visible: false});
      await toggleStar(formId);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteForm = async formId => {
    try {
      setIsLoading(true);
      setModal({formId: '', visible: false});
      await deleteForm(formId);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshForms = async () => {
    try {
      setIsLoading(true);
      setFormsLoading(true);
      await getForms();
      setFormsLoading(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
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
          <Modal.Header>Menu</Modal.Header>
          <Modal.Body>
            <Button
              variant="ghost"
              onPress={() => handleFormViewNavigation(modal.formId)}
              style={styles.modalButton}>
              View Form
            </Button>
            <Button
              variant="ghost"
              onPress={() => handleToggleStar(modal.formId)}
              style={styles.modalButton}>
              Toggle Star
            </Button>
            <Button
              variant="ghost"
              onPress={() => handleDeleteForm(modal.formId)}
              style={styles.modalButton}>
              Delete Form
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <FlatList
        data={[...forms.items, {type: 'logout'}]}
        refreshing={formsLoading}
        onRefresh={refreshForms}
        renderItem={({item}) =>
          item.type === 'logout' ? (
            <Button
              leftIcon={<Icon name="logout-variant" size={24} color="white" />}
              style={styles.logoutButton}
              isDisabled={isLoading || formsLoading}
              onPress={logOut}>
              Logout
            </Button>
          ) : (
            <FormListItem
              form={item}
              onLongPress={toggleModal}
              onPress={handleFormViewNavigation}
              onStarPress={handleToggleStar}
              isLoading={isLoading}
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
  modalButton: {
    marginVertical: 5,
  },
});
