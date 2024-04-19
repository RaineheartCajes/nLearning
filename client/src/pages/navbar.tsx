import React, { useEffect, useState } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../auth/auth-context';

const MyNavbar: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const currentUserDataString = localStorage.getItem('currentUser');
    if (currentUserDataString) {
      const currentUserData = JSON.parse(currentUserDataString);
      setUsername(currentUserData.username);  
    }
  }, [isAuthenticated]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" >
    <Navbar.Brand href="#home">MINI PROJECT</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto"></Nav>
      {isAuthenticated ? (
        <Nav className='ms-auto'>
          <NavDropdown title={username || 'User'} id="basic-nav-dropdown" >
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      ) : (
        <Nav>
          <Nav.Link onClick={login}>Login</Nav.Link>
        </Nav>
      )}
    </Navbar.Collapse>
  </Navbar>
  );
};

export default MyNavbar;
