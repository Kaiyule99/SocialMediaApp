import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getUserDataApi, fetchPostsApi } from '../api/socialApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('chirp-token'));
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const refreshData = useCallback(async () => {
        if (!token) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            const [userData, postsData] = await Promise.all([
                getUserDataApi(token),
                fetchPostsApi(token)
            ]);
            setUser(userData);
            setPosts(postsData);
        } catch (error) {
            console.error("Data fetch failed:", error);
            logout();
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    const login = (newToken) => {
        localStorage.setItem('chirp-token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setPosts([]);
        localStorage.removeItem('chirp-token');
    };
    
    const updateUser = (newUserData) => setUser(newUserData);

    const value = { user, token, posts, refreshData, login, logout, updateUser, isAuthenticated: !!user, isLoading };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
