import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState({ totalUsers: '--', totalRooms: '--', totalBookings: '--' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
   const backendURL =  process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${backendURL}/api/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        setError('Failed to load stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="row g-4">
      <div className="col-md-4">
        <div className="card shadow-sm text-center p-4">
          <h5 className="text-primary">Total Users</h5>
          <div className="display-5 fw-bold">{loading ? '...' : stats.totalUsers}</div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card shadow-sm text-center p-4">
          <h5 className="text-primary">Total Rooms</h5>
          <div className="display-5 fw-bold">{loading ? '...' : stats.totalRooms}</div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card shadow-sm text-center p-4">
          <h5 className="text-primary">Total Bookings</h5>
          <div className="display-5 fw-bold">{loading ? '...' : stats.totalBookings}</div>
        </div>
      </div>
      {error && <div className="col-12"><div className="alert alert-danger text-center">{error}</div></div>}
    </div>
  );
} 