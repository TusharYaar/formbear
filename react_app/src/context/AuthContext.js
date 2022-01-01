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
  //  getUserForms
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
      const { emailVerified, uid, displayName, photoURL } = user;
      setUser({
        isSignedIn: true,
        user: { emailVerified, uid, displayName, photoURL },
        isLoading: false,
      });
      const IdToken = await user.getIdToken(true);
      const dataResponse = await getUserProfile(IdToken);
      console.log(dataResponse);
      // const formsResponse = await getUserForms(IdToken);
      console.log("User Logged in");
    } else {
      setUser({ ...DEFUALT_USER_STATE, isLoading: false });
      console.log("No User or User Logged Out");
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

  const value = {
    currentUser,
    logOut,
    signIn,
    signUp,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
