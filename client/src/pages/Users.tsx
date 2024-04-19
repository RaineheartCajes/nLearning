import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('formData');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const handleButtonClick = () => {
    // Navigate to the "/loan" route
    navigate('/loan');
  };

  return (
    <div className="container mt-5">
      <h1>Users</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Loans</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  
                </td>
                <td>
                  <button className="btn btn-primary mr-2" onClick={handleButtonClick}>Edit</button>
                  <button className="btn btn-success" onClick={handleButtonClick}>Add</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
