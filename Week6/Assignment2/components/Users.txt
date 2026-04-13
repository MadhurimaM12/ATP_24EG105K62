import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface UsersProps {
  onAddUser: () => void;
}

const Users: React.FC<UsersProps> = ({ onAddUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        {users.map(user => (
          <div key={user.id} className="col-md-3 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <button className="btn btn-primary" onClick={onAddUser}>
                  Add User
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
