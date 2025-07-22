import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialRoom = {
  name: '',
  description: '',
  price: '',
  address: '',
  amenities: '', // comma separated
};

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMsg, setActionMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [roomForm, setRoomForm] = useState(initialRoom);
  const [editId, setEditId] = useState(null);
  const backendURL =  process.env.REACT_APP_API_URL;

  const fetchRooms = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${backendURL}/api/admin/rooms`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRooms(res.data);
    } catch (err) {
      setError('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
    setActionMsg('');
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${backendURL}/api/admin/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActionMsg('Room deleted');
      fetchRooms();
    } catch (err) {
      setActionMsg('Failed to delete room');
    }
  };

  const openAddModal = () => {
    setRoomForm(initialRoom);
    setModalMode('add');
    setEditId(null);
    setShowModal(true);
  };

  const openEditModal = (room) => {
    setRoomForm({
      name: room.name || '',
      description: room.description || '',
      price: room.price || '',
      address: room.address || '',
      amenities: (room.amenities || []).join(', '),
    });
    setModalMode('edit');
    setEditId(room._id);
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setRoomForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalClose = () => {
    setShowModal(false);
    setRoomForm(initialRoom);
    setEditId(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setActionMsg('');
    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...roomForm,
        price: Number(roomForm.price),
        amenities: roomForm.amenities.split(',').map(a => a.trim()).filter(Boolean),
      };
      if (modalMode === 'add') {
        await axios.post(`${backendURL}/api/admin/rooms`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActionMsg('Room added');
      } else {
        await axios.put(`${backendURL}/api/admin/rooms/${editId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActionMsg('Room updated');
      }
      fetchRooms();
      setShowModal(false);
    } catch (err) {
      setActionMsg('Failed to save room');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Room Listings</h3>
        <button className="btn btn-primary" onClick={openAddModal}>Add Room</button>
      </div>
      {actionMsg && <div className="alert alert-info">{actionMsg}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center">Loading...</td></tr>
            ) : rooms.length === 0 ? (
              <tr><td colSpan="4" className="text-center">No rooms found</td></tr>
            ) : (
              rooms.map(room => (
                <tr key={room._id}>
                  <td>{room.name}</td>
                  <td>{room.price}</td>
                  <td>{room.address}</td>
                  <td>
                    <button className="btn btn-sm btn-secondary me-2" onClick={() => openEditModal(room)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(room._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit Room */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalMode === 'add' ? 'Add Room' : 'Edit Room'}</h5>
                <button type="button" className="btn-close" onClick={handleModalClose}></button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input name="name" className="form-control" value={roomForm.name} onChange={handleFormChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea name="description" className="form-control" value={roomForm.description} onChange={handleFormChange} rows={2} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input name="price" type="number" className="form-control" value={roomForm.price} onChange={handleFormChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input name="address" className="form-control" value={roomForm.address} onChange={handleFormChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Amenities (comma separated)</label>
                    <input name="amenities" className="form-control" value={roomForm.amenities} onChange={handleFormChange} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{modalMode === 'add' ? 'Add Room' : 'Save Changes'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 