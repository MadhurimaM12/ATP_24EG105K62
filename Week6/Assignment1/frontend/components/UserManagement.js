import React, { useState } from 'react';
import UserForm from './UserForm';
import UserTable from './UserTable';
import './UserManagement.css';

function UserManagement() {
  const [users, setUsers] = useState([]);

  const handleAddUser = (newUser) => {
    const userWithId = {
      ...newUser,
      id: Date.now()
    };
    setUsers([...users, userWithId]);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEditUser = (id, updatedUser) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, ...updatedUser } : user
    ));
  };

  return (
    <div className="user-management">
      <div className="form-section">
        <h2>Add New User</h2>
        <UserForm onAddUser={handleAddUser} />
      </div>

      <div className="table-section">
        <h2>Users List ({users.length})</h2>
        <UserTable 
          users={users} 
          onDeleteUser={handleDeleteUser}
          onEditUser={handleEditUser}
        />
      </div>
    </div>
  );
}

export default UserManagement;
