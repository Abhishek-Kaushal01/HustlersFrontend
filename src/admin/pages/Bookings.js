import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMsg, setActionMsg] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setActionMsg('');
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/admin/bookings/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActionMsg('Booking status updated');
      fetchBookings();
    } catch (err) {
      setActionMsg('Failed to update status');
    }
  };

  return (
    <div>
      <h3 className="mb-4">Booking Management</h3>
      {actionMsg && <div className="alert alert-info">{actionMsg}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>User</th>
              <th>Room</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="text-center">Loading...</td></tr>
            ) : bookings.length === 0 ? (
              <tr><td colSpan="6" className="text-center">No bookings found</td></tr>
            ) : (
              bookings.map(booking => (
                <tr key={booking._id}>
                  <td>{booking.user?.name || 'N/A'}</td>
                  <td>{booking.room?.name || 'N/A'}</td>
                  <td>{booking.checkin ? new Date(booking.checkin).toLocaleDateString() : ''}</td>
                  <td>{booking.checkout ? new Date(booking.checkout).toLocaleDateString() : ''}</td>
                  <td>{booking.status}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={booking.status}
                      onChange={e => handleStatusChange(booking._id, e.target.value)}
                      style={{ minWidth: 120 }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
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