import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserDataApi } from '../api/socialApi.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('chirp-token'));
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                localStorage.setItem('chirp-token', token);
                try {
                    const userData = await getUserDataApi(token);
                    setUser(userData);
                } catch (error) {
                    console.error("Session expired or invalid.", error);
                    setToken(null);
                    setUser(null);
                    localStorage.removeItem('chirp-token');
                }
            } else {
                localStorage.removeItem('chirp-token');
            }
            setIsLoading(false);
        };
        fetchUser();
    }, [token]);

    const login = (newToken) => setToken(newToken);
    const logout = () => {
        setToken(null);
        setUser(null);
    };

    const value = { user, token, login, logout, isAuthenticated: !!token, isLoading };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
