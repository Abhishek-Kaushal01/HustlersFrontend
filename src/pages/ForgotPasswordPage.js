import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const backendURL =  process.env.REACT_APP_API_URL;

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);
    try {
      await axios.post(`${backendURL}/api/auth/forgot-password`, { email });
      setMessage('Reset link sent to your email.');
      setSuccess(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send reset link');
      setSuccess(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: 400, width: '100%' }}>
        <h2 className="mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input name="email" type="email" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
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

export default ForgotPasswordPage; 