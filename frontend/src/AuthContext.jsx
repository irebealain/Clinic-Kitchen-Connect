import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores the authenticated user

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await axiosInstance.get('/api/users/');
          setUser(response.data); // Assuming your backend provides user details here
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
