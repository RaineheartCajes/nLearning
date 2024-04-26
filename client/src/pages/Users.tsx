import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loan from './LoanModal';

type User = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/users', {
          params: { search: searchTerm }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (searchTerm === '' || searchTerm.length > 2) { // Optionally, search only when there are 3+ characters to reduce load.
      fetchUsers();
    }
  }, [searchTerm]);

  return (
    <div className="container mt-5">
      <h1>Users</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Username, Firstname, Lastname, or Email"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-primary mr-2" onClick={() => setSelectedUserId(user._id)}>Edit Loan</button>
                  <button className="btn btn-success mr-2" onClick={() => setSelectedUserId(user._id)}>Add Loan</button>
                  <button className="btn btn-danger" onClick={() => setUsers(users.filter(u => u._id !== user._id))}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUserId && (
        <div className={`modal fade show`} style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Loan Details</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedUserId(null)}></button>
              </div>
              <div className="modal-body">
                <Loan userId={selectedUserId} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
