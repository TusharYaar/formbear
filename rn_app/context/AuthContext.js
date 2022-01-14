import React, {useContext, useState, useEffect, useCallback} from 'react';

import firebaseAuth from '@react-native-firebase/auth';
import firebaseMessaging from '@react-native-firebase/messaging';

import {MMKV} from 'react-native-mmkv';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

import service from '../android/app/google-services.json';

import {
  getUserProfile,
  addMobileDevice,
  getUserForms,
  deleteUserForm,
  toggleUserFormStar,
} from '../utils/apiFunction';

const DEFUALT_USER_STATE = {
  isSignedIn: false,
  user: null,
  isLoading: true,
};

const AuthContext = React.createContext();

const storage = new MMKV();

GoogleSignin.configure({
  webClientId: service.client[0].oauth_client[1].client_id,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({children}) {
  const auth = firebaseAuth();
  const messaging = firebaseMessaging();
  const [currentUser, setCurrentUser] = useState(DEFUALT_USER_STATE);

  useEffect(() => {
    if (!storage.getString('app_settings.app_bootstrapped')) {
      messaging.registerDeviceForRemoteMessages();
      storage.set('app_settings.app_bootstrapped', 'true');
    }
  }, []);

  const handleAuthChange = useCallback(async user => {
    try {
      if (user) {
        const {emailVerified, uid, displayName, photoURL, email} = user;
        const IdToken = await user.getIdToken(true);
        const response = await getUserProfile(IdToken);
        const messageToken = await messaging.getToken();
        const device = response.mobile_devices.find(
          device => device.message_token === messageToken,
        );

        if (!device) {
          const device = await addMobileDevice(IdToken, messageToken);
          response.mobile_devices.push(device);
        }
        setCurrentUser({
          isSignedIn: true,
          user: {email, emailVerified, uid, displayName, photoURL, ...response},
          isLoading: false,
        });
      } else {
        setCurrentUser({...DEFUALT_USER_STATE, isLoading: false});
        console.log('No User or User Logged Out');
      }
    } catch (err) {
      console.log(err.message);
      setCurrentUser({...DEFUALT_USER_STATE, isLoading: false});
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(handleAuthChange);
    return unsubscribe;
  }, [handleAuthChange]);

  const signIn = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setCurrentUser({...DEFUALT_USER_STATE, isLoading: false});
      throw error;
    }
  };

  // const signUp = async (email, password) => {
  //   try {
  //     setCurrentUser({...DEFUALT_USER_STATE});
  //     await createUserWithEmailAndPassword(auth, email, password);
  //   } catch (error) {
  //     setCurrentUser({...DEFUALT_USER_STATE, isLoading: false});
  //     console.log(error.message);
  //     throw error;
  //   }
  // };

  const logOut = () => {
    setCurrentUser({...DEFUALT_USER_STATE, isLoading: false});
    auth.signOut();
  };

  const signInWithGoogle = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential =
      firebaseAuth.GoogleAuthProvider.credential(idToken);
    // return
    auth.signInWithCredential(googleCredential);
  };

  const verifyEmail = async () => {
    try {
      await auth.currentUser.sendEmailVerification();
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const checkEmailVerified = async () => {
    try {
      const isVerified = await auth.currentUser.emailVerified;
      if (isVerified !== currentUser.user.email_verified)
        console.log('Email Verified: ', isVerified);
      setCurrentUser({
        ...currentUser,
        user: {
          ...currentUser.user,
          email_verified: isVerified,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  const getForms = async () => {
    try {
      const IdToken = await auth.currentUser.getIdToken(true);
      const response = await getUserForms(IdToken);
      setCurrentUser({
        ...currentUser,
        user: {...currentUser.user, forms: response},
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const deleteForm = async formId => {
    try {
      const IdToken = await auth.currentUser.getIdToken(true);
      const response = await deleteUserForm(IdToken, formId);
      console.log(response);
      const updatedForms = currentUser.user.forms.items.filter(
        form => form.key !== formId,
      );
      setCurrentUser({
        ...currentUser,
        user: {
          ...currentUser.user,
          forms: {
            items: updatedForms,
            count: updatedForms.length,
          },
        },
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };
  const toggleStar = async formId => {
    try {
      const IdToken = await auth.currentUser.getIdToken(true);
      const response = await toggleUserFormStar(IdToken, formId);
      console.log(response);
      const updatedForms = currentUser.user.forms.items.map(form => {
        if (form.key === formId) {
          return {...form, star: !form.star};
        }
        return form;
      });
      setCurrentUser({
        ...currentUser,
        user: {
          ...currentUser.user,
          forms: {
            items: updatedForms,
            count: updatedForms.length,
          },
        },
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const value = {
    currentUser,
    logOut,
    signIn,
    verifyEmail,
    // signUp,
    checkEmailVerified,
    signInWithGoogle,
    getForms,
    toggleStar,
    deleteForm,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
