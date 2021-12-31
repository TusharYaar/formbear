import React, { useContext, useState, useEffect, useCallback } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "../firebase/config";

import { getUserProfile, getUserForms } from "../Utils/apiFunction";

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
      const formsResponse = await getUserForms(IdToken);
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

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    signOut(auth);
  };

  const value = {
    currentUser,
    logOut,
    signIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
