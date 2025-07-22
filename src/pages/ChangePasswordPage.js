import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordPage = () => {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/auth/change-password', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Password changed successfully!');
      setSuccess(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Password change failed');
      setSuccess(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: 400, width: '100%' }}>
        <h2 className="mb-4 text-center">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="oldPassword" className="form-label">Old Password</label>
            <input name="oldPassword" type="password" className="form-control" id="oldPassword" placeholder="Enter old password" value={form.oldPassword} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input name="newPassword" type="password" className="form-control" id="newPassword" placeholder="Enter new password" value={form.newPassword} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Change Password</button>
        </form>
        {message && (
          <div className={`alert mt-3 ${success ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordPage; 