import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../auth/auth-context';

const MyNavbar: React.FC = () => {
  const { isAuthenticated, logout, login } = useAuth();
  const username = useSelector((state: RootState) => state.session.username);

 
  return (
    <Navbar bg="dark" variant="dark" style={{ paddingRight: '100px', height: '60px' }} >
    <Navbar.Brand >MINI PROJECT</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto"></Nav>
      {isAuthenticated ? (
        <Nav className='ms-auto'>
           <NavDropdown title={username || 'User'} id="basic-nav-dropdown" style={{ fontSize: '20px'}}>
      <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
    </NavDropdown>
        </Nav>
      ) : (
        <Nav className='ms-auto'>
          <Nav.Link onClick={login}>Login</Nav.Link>
        </Nav>
      )}
    </Navbar.Collapse>
  </Navbar>
  );
};

export default MyNavbar;
