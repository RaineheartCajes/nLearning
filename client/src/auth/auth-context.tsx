import React, { createContext, useContext} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store'; 
import { setSession, clearSession} from '../redux/session'; 

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string, username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.session.token);
  const isAuthenticated = Boolean(token);

  

  const login = (token: string, username: string) => {
    dispatch(setSession({ token, username }));
  };

  const logout = () => {
    dispatch(clearSession()); 
    window.location.href = '/'; 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
