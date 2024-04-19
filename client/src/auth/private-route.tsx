import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth-context';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const auth = useAuth();

  return auth.isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;