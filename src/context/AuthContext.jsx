// src/context/AuthContext.jsx
import { useState, useEffect, createContext, useContext } from 'react';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setLoading(true);
        setError(null);
        
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              setUserData(userDoc.data());
              setIsAdmin(userDoc.data()?.isAdmin || false);
              setIsHost(userDoc.data()?.isHost || false);
            }
          } catch (err) {
            console.error("Error fetching user data:", err);
            setUserData(null);
            setIsAdmin(false);
            setIsHost(false);
          }
        } else {
          setUserData(null);
          setIsAdmin(false);
          setIsHost(false);
        }
        
        setCurrentUser(user);
      } catch (err) {
        setError(err);
        console.error("Authentication error:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    userData,
    isAdmin,
    isHost,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};