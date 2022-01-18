import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';

import {Button, FlatList, Modal} from 'native-base';

import {useAuth} from '../context/AuthContext';

import FlatlistItem from '../components/FlatlistItem';

const FormListView = ({navigation}) => {
  const {
    currentUser: {
      user: {forms},
    },
    toggleStar,
    getForms,
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
    <View style={styles.container}>
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
        data={[{type: 'userinfo'}, ...forms.items]}
        refreshing={formsLoading}
        onRefresh={refreshForms}
        renderItem={({item}) => (
          <FlatlistItem
            item={item}
            isLoading={isLoading}
            formsLoading={formsLoading}
            toggleModal={toggleModal}
            handleFormViewNavigation={handleFormViewNavigation}
            handleToggleStar={handleToggleStar}
          />
        )}
      />
    </View>
  );
};

export default FormListView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },

  modalButton: {
    marginVertical: 5,
  },
});
