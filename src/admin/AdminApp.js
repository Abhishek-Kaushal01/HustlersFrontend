import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Rooms from './pages/Rooms';
import Bookings from './pages/Bookings';
import Login from './pages/Login';
import Settings from './pages/Settings';
import RequireAdmin from './components/RequireAdmin';

function AdminLayout({ children }) {
  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <nav className="bg-dark text-light p-3" style={{ minWidth: 220 }}>
        <h4 className="text-primary mb-4">Hustlers Admin</h4>
        <ul className="nav flex-column gap-2">
          <li className="nav-item"><Link className="nav-link text-light" to="/admin/dashboard">Dashboard</Link></li>
          <li className="nav-item"><Link className="nav-link text-light" to="/admin/users">Users</Link></li>
          <li className="nav-item"><Link className="nav-link text-light" to="/admin/rooms">Rooms</Link></li>
          <li className="nav-item"><Link className="nav-link text-light" to="/admin/bookings">Bookings</Link></li>
          <li className="nav-item"><Link className="nav-link text-light" to="/admin/settings">Settings</Link></li>
          <li className="nav-item mt-4"><Link className="nav-link text-danger" to="/admin/login">Logout</Link></li>
        </ul>
      </nav>
      {/* Main Content */}
      <div className="flex-grow-1 bg-light">
        {/* Topbar */}
        <div className="bg-white shadow-sm p-3 mb-4 d-flex align-items-center justify-content-between">
          <span className="fw-bold fs-5">Admin Portal</span>
        </div>
        <div className="container-fluid px-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function AdminApp() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <RequireAdmin>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="users" element={<Users />} />
                  <Route path="rooms" element={<Rooms />} />
                  <Route path="bookings" element={<Bookings />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="dashboard" />} />
                </Routes>
              </AdminLayout>
            </RequireAdmin>
          }
        />
      </Routes>
    </Router>
  );
} 