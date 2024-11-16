import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create the AuthContext
export const AuthContext = createContext();

// Provide the AuthContext
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  const login = (token, userRole) => {
    setAuthToken(token);
    setRole(userRole);
    localStorage.setItem('authToken', token);
    localStorage.setItem('role', userRole);
  };

  const logout = () => {
    setAuthToken(null);
    setRole(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ authToken, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Export the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
