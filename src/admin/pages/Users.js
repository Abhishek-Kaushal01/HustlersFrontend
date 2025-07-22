import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMsg, setActionMsg] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePromote = async (id) => {
    setActionMsg('');
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/admin/users/${id}/promote`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActionMsg('User promoted to admin');
      fetchUsers();
    } catch (err) {
      setActionMsg('Failed to promote user');
    }
  };

  const handleDelete = async (id) => {
    setActionMsg('');
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActionMsg('User deleted');
      fetchUsers();
    } catch (err) {
      setActionMsg('Failed to delete user');
    }
  };

  return (
    <div>
      <h3 className="mb-4">User Management</h3>
      {actionMsg && <div className="alert alert-info">{actionMsg}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center">Loading...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan="4" className="text-center">No users found</td></tr>
            ) : (
              users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.role !== 'admin' && (
                      <button className="btn btn-sm btn-success me-2" onClick={() => handlePromote(user._id)}>Promote to Admin</button>
                    )}
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 