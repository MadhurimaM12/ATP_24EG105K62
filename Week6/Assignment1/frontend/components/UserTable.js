import React, { useState } from 'react';
import './UserTable.css';
function UserTable({ users, onDeleteUser, onEditUser }) {
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const handleEditClick = (user) => {
    setEditingId(user.id);
    setEditFormData(user);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSaveEdit = (id) => {
    onEditUser(id, editFormData);
    setEditingId(null);
    setEditFormData({});
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };
  if (users.length === 0) {
    return (
      <div className="user-table-container">
        <div className="empty-state">
          <p>No users added yet. Create a user using the form above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={editingId === user.id ? 'editing' : ''}>
              <td>
                {editingId === user.id ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editFormData.firstName}
                    onChange={handleEditChange}
                    className="edit-input"
                  />
                ) : (
                  user.firstName
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editFormData.lastName}
                    onChange={handleEditChange}
                    className="edit-input"
                  />
                ) : (
                  user.lastName
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditChange}
                    className="edit-input"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editFormData.phone}
                    onChange={handleEditChange}
                    className="edit-input"
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <select
                    name="department"
                    value={editFormData.department}
                    onChange={handleEditChange}
                    className="edit-input"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                ) : (
                  user.department
                )}
              </td>
              <td className="actions-cell">
                {editingId === user.id ? (
                  <>
                    <button
                      className="btn-save"
                      onClick={() => handleSaveEdit(user.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn-edit"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => onDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
