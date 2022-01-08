import React, {useContext, useState, useEffect, useCallback} from 'react';
// import {
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithRedirect,
//   createUserWithEmailAndPassword,
//   signOut,
// } from 'firebase/auth';

import firebaseAuth from '@react-native-firebase/auth';

import {
  getUserProfile,
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

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({children}) {
  const auth = firebaseAuth();
  const [currentUser, setCurrentUser] = useState(DEFUALT_USER_STATE);

  const handleAuthChange = useCallback(async user => {
    try {
      if (user) {
        // console.log(user);
        const {emailVerified, uid, displayName, photoURL, email} = user;
        setCurrentUser({
          isSignedIn: true,
          user: {email, emailVerified, uid, displayName, photoURL, forms: []},
          isLoading: false,
        });
        // console.log('Fetching user profile');
        // const IdToken = await user.getIdToken(true);
        // const response = await getUserProfile(IdToken);
        // console.log(response);
        // setCurrentUser({
        //   isSignedIn: true,
        //   user: {email, emailVerified, uid, displayName, photoURL, ...response},
        //   isLoading: false,
        // });

        console.log('User Logged in');
      } else {
        setCurrentUser({...DEFUALT_USER_STATE, isLoading: false});
        console.log('No User or User Logged Out');
      }
    } catch (err) {
      console.log(err);
      setCurrentUser({...DEFUALT_USER_STATE, isLoading: false});
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(handleAuthChange);
    return unsubscribe;
  }, [handleAuthChange]);

  const signIn = async (email, password) => {
    try {
      setCurrentUser({...DEFUALT_USER_STATE});
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setCurrentUser({...DEFUALT_USER_STATE, isLoading: false});
      console.log(error.message);
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

  // const logOut = () => {
  //   signOut(auth);
  // };

  // const signInWithGoogle = () => {
  //   setCurrentUser({...DEFUALT_USER_STATE});
  //   return signInWithRedirect(auth, googleProvider);
  // };

  // const getForms = async () => {
  //   try {
  //     const IdToken = await auth.currentUser.getIdToken(true);
  //     const response = await getUserForms(IdToken);
  //     setCurrentUser({
  //       ...currentUser,
  //       user: {...currentUser.user, forms: response},
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error.message);
  //     throw error;
  //   }
  // };

  // const deleteForm = async formId => {
  //   try {
  //     const IdToken = await auth.currentUser.getIdToken(true);
  //     const response = await deleteUserForm(IdToken, formId);
  //     console.log(response);
  //     const updatedForms = currentUser.user.forms.items.filter(
  //       form => form.key !== formId,
  //     );
  //     setCurrentUser({
  //       ...currentUser,
  //       user: {
  //         ...currentUser.user,
  //         forms: {
  //           items: updatedForms,
  //           count: updatedForms.length,
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //     throw error;
  //   }
  // };
  // const toggleStar = async formId => {
  //   try {
  //     const IdToken = await auth.currentUser.getIdToken(true);
  //     const response = await toggleUserFormStar(IdToken, formId);
  //     console.log(response);
  //     const updatedForms = currentUser.user.forms.items.map(form => {
  //       if (form.key === formId) {
  //         return {...form, star: !form.star};
  //       }
  //       return form;
  //     });
  //     setCurrentUser({
  //       ...currentUser,
  //       user: {
  //         ...currentUser.user,
  //         forms: {
  //           items: updatedForms,
  //           count: updatedForms.length,
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //     throw error;
  //   }
  // };

  const value = {
    currentUser,
    // logOut,
    signIn,
    // signUp,
    // signInWithGoogle,
    // getForms,
    // toggleStar,
    // deleteForm,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
