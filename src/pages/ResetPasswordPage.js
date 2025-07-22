import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const backendURL =  process.env.REACT_APP_API_URL;
  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);
    try {
      await axios.post(`${backendURL}/api/auth/reset-password/${token}`, { password });
      setMessage('Password reset successful!');
      setSuccess(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Password reset failed');
      setSuccess(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: 400, width: '100%' }}>
        <h2 className="mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">New Password</label>
            <input name="password" type="password" className="form-control" id="password" placeholder="Enter new password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Reset Password</button>
        </form>
        {message && (
          <div className={`alert mt-3 ${success ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message}
          </div>
        )}
        <div className="mt-3 text-center">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 