// src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut,
    createUserWithEmailAndPassword 
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // This runs when the app loads and listens for login/logout changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe; // Cleanup function
    }, []);

    // Function to log a user in
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Function to create a new user account
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Function to log a user out
    const logout = () => {
        return signOut(auth);
    };
    
    // NOTE: In a real app, you would also fetch the householdId here.
    const value = {
        currentUser,
        login,
        logout,
        signup,
        // placeholder for household ID - will be updated later
        householdId: "DEMO_HOUSEHOLD_ID_123" 
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
