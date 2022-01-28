import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth, googleProvider } from "../firebase/config";

import {
  getUserProfile,
  getUserForms,
  deleteUserForm,
  toggleUserFormStar,
  markUserFormViewed,
  deleteUserProfile,
  addUserAPIToken,
  getUserAPITokens,
  deleteUserAPIToken,
} from "../Utils/apiFunction";

const DEFUALT_USER_STATE = {
  isSignedIn: false,
  user: null,
  isLoading: true,
};

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [currentUser, setUser] = useState(DEFUALT_USER_STATE);

  const handleAuthChange = useCallback(async (user) => {
    if (user) {
      const { emailVerified, uid, displayName, photoURL, email } = user;
      setUser({
        isSignedIn: true,
        user: { email, emailVerified, uid, displayName, photoURL, forms: [] },
        isLoading: false,
      });
      const IdToken = await user.getIdToken(true);
      const response = await getUserProfile(IdToken);
      console.log(response);
      setUser({
        isSignedIn: true,
        user: { email, emailVerified, uid, displayName, photoURL, ...response },
        isLoading: false,
      });
    } else {
      setUser({ ...DEFUALT_USER_STATE, isLoading: false });
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);
    return unsubscribe;
  }, [handleAuthChange]);

  const signIn = async (email, password) => {
    try {
      setUser({ ...DEFUALT_USER_STATE });
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setUser({ ...DEFUALT_USER_STATE, isLoading: false });
      console.log(error.message);
      throw error;
    }
  };

  const signUp = async (email, password) => {
    try {
      setUser({ ...DEFUALT_USER_STATE });
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setUser({ ...DEFUALT_USER_STATE, isLoading: false });
      console.log(error.message);
      throw error;
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  const signInWithGoogle = () => {
    setUser({ ...DEFUALT_USER_STATE });
    return signInWithRedirect(auth, googleProvider);
  };

  const getForms = async () => {
    try {
      const IdToken = await auth.currentUser.getIdToken(true);
      const response = await getUserForms(IdToken);
      setUser({
        ...currentUser,
        user: { ...currentUser.user, forms: response },
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const deleteForm = async (formId) => {
    try {
      const IdToken = await auth.currentUser.getIdToken(true);
      const response = await deleteUserForm(IdToken, formId);
      console.log(response);
      const updatedForms = currentUser.user.forms.items.filter((form) => form.key !== formId);
      setUser({
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
  const toggleStar = async (formId) => {
    try {
      const IdToken = await auth.currentUser.getIdToken(true);
      await toggleUserFormStar(IdToken, formId);
      const updatedForms = currentUser.user.forms.items.map((form) => {
        if (form.key === formId) {
          return { ...form, star: !form.star };
        }
        return form;
      });
      setUser({
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

  const markFormViewed = async (formId) => {
    try {
      const IdToken = await auth.currentUser.getIdToken(true);
      await markUserFormViewed(IdToken, formId);
      const updatedForms = currentUser.user.forms.items.map((form) => {
        if (form.key === formId) {
          return { ...form, form_viewed: true };
        }
        return form;
      });
      setUser({
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

  const deleteProfile = async () => {
    try {
      const IdToken = await auth.currentUser.getIdToken(true);
      await deleteUserProfile(IdToken);
      logOut();
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const getTokens = async () => {
    try {
      const IdToken = await auth.currentUser.getIdToken(true);
      const response = await getUserAPITokens(IdToken);

      return response.items;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const createToken = async (expiry_duration, allow_delete) => {
    try {
      const IdToken = await auth.currentUser.getIdToken(true);
      const response = await addUserAPIToken(IdToken, parseInt(expiry_duration), allow_delete);
      return response;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const deleteToken = async (token_id) => {
    try {
      const IdToken = await auth.currentUser.getIdToken(true);
      const response = await deleteUserAPIToken(IdToken, token_id);
      return response;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const value = {
    currentUser,
    logOut,
    signIn,
    signUp,
    signInWithGoogle,
    getForms,
    toggleStar,
    markFormViewed,
    deleteForm,
    deleteProfile,
    getTokens,
    createToken,
    deleteToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
