import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, resetPassword } from './firebase'; 

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp: createUserWithEmailAndPassword,
    signIn: signInWithEmailAndPassword,
    signOut,
    resetPassword
    // Add other methods or state as needed
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};