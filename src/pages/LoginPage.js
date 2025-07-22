import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user)); // Save user info
      window.dispatchEvent(new Event('storage'));
      setMessage('Login successful!');
      setSuccess(true);
      setTimeout(() => navigate('/'), 1000); // Redirect to home after 1s
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
      setSuccess(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: 400, width: '100%' }}>
        <h2 className="mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input name="email" type="email" className="form-control" id="email" placeholder="Enter email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input name="password" type="password" className="form-control" id="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        {message && (
          <div className={`alert mt-3 ${success ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message}
          </div>
        )}
        <div className="mt-3 text-center">
          <a href="/forgot-password">Forgot password?</a>
        </div>
        <div className="mt-2 text-center">
          <span>Don't have an account? <a href="/register">Register</a></span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 