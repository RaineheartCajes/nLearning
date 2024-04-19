import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './auth/auth-context';
import Sidebar from './pages/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Loan from './pages/Loan';
import PrivateRoute from './auth/private-route';
import MyNavbar from './pages/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const location = useLocation(); 
  const noNavbarRoutes = ['/', '/register']; 
  
  const showNavbarAndSidebar = !noNavbarRoutes.includes(location.pathname); 

  return (
    <AuthProvider>
      {showNavbarAndSidebar && <MyNavbar />}
      <div className="d-flex">
        {showNavbarAndSidebar && (
          <div className="div sidebar">
            <Sidebar /> 
          </div>
        )}
        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/users" element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            } />
            <Route path="/loan" element={
              <PrivateRoute>
                <Loan />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
