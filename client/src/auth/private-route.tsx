import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth-context';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const auth = useAuth();
  
  
  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  
  return children;
};

export default PrivateRoute;