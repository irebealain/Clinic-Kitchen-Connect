import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import AuthContext for authentication state

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { authToken, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      // Redirect to login if not authenticated
      navigate('/login');
    } else if (allowedRoles && !allowedRoles.includes(role)) {
      // Redirect to an unauthorized page or a fallback
      navigate('/');
    }
  }, [authToken, role, allowedRoles, navigate]);

  // Render the component only if authenticated and role matches
  if (!authToken || (allowedRoles && !allowedRoles.includes(role))) {
    return null; // Prevent rendering before navigation happens
  }

  return children;
};

export default ProtectedRoute;
