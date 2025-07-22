import React, { useState, useEffect } from "react";
import Heading from "../components/common/Heading";
import { useLocation, useNavigate } from "react-router-dom";
import { roomItems } from "../components/data/Data";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const roomId = location.state?.roomId;
  const room = roomId !== undefined ? roomItems[roomId] : null;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkin: "",
    checkout: "",
    guests: 1,
    requests: "",
    guestDetails: [{ name: "", age: "", gender: "" }],
  });
  const [showPayment, setShowPayment] = useState(false);
  const [payment, setPayment] = useState({ card: "", expiry: "", cvv: "" });
  const [paid, setPaid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [upi, setUpi] = useState('');

  // Protect route: only allow if logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { message: 'Please login to book a room.' } });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleGuestChange = (idx, e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const guestDetails = [...prev.guestDetails];
      guestDetails[idx][name] = value;
      return { ...prev, guestDetails };
    });
  };
  const handleGuestsNumber = (e) => {
    const value = Math.max(1, Math.min(10, Number(e.target.value)));
    setForm((prev) => {
      let guestDetails = prev.guestDetails.slice(0, value);
      while (guestDetails.length < value) {
        guestDetails.push({ name: "", age: "", gender: "" });
      }
      return { ...prev, guests: value, guestDetails };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  };
  const handlePay = (e) => {
    e.preventDefault();
    setPaid(true);
  };
  return (
    <>
      <Heading heading="Booking" title="Home" subtitle="Booking" />
      <div style={{ maxWidth: 600, margin: "2rem auto", background: "#fff", borderRadius: 16, boxShadow: "0 8px 32px rgba(15,23,43,0.10)", padding: "2rem" }}>
        <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-3" style={{ fontWeight: 600, borderRadius: 8 }}>&larr; Back</button>
        {room && (
          <div style={{ marginBottom: 24, padding: 16, background: "var(--light)", borderRadius: 12, display: "flex", alignItems: "center", gap: 16 }}>
            <img src={room.img} alt={room.name} style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 8 }} />
            <div>
              <div style={{ fontWeight: 700, color: "var(--primary)" }}>{room.name}</div>
              <div style={{ color: "var(--accent)", fontWeight: 600 }}>{room.price}</div>
            </div>
          </div>
        )}
        {!showPayment && !paid && (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input type="tel" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
            </div>
            <div className="mb-3 d-flex gap-3">
              <div style={{ flex: 1 }}>
                <label className="form-label">Check-in</label>
                <input type="date" className="form-control" name="checkin" value={form.checkin} onChange={handleChange} required />
              </div>
              <div style={{ flex: 1 }}>
                <label className="form-label">Check-out</label>
                <input type="date" className="form-control" name="checkout" value={form.checkout} onChange={handleChange} required />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Guests</label>
              <input type="number" className="form-control" name="guests" min={1} max={10} value={form.guests} onChange={handleGuestsNumber} required />
            </div>
            {form.guests > 1 && form.guestDetails.slice(1).map((guest, idx) => (
              <div key={idx + 1} className="mb-3 p-3" style={{ background: "var(--light)", borderRadius: 10, marginBottom: 16 }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Guest {idx + 2} Details</div>
                <div className="row g-2">
                  <div className="col-6">
                    <input type="text" className="form-control" name="name" placeholder="Name" value={guest.name} onChange={e => handleGuestChange(idx + 1, e)} required />
                  </div>
                  <div className="col-3">
                    <input type="number" className="form-control" name="age" placeholder="Age" min={0} value={guest.age} onChange={e => handleGuestChange(idx + 1, e)} required />
                  </div>
                  <div className="col-3">
                    <select className="form-control" name="gender" value={guest.gender} onChange={e => handleGuestChange(idx + 1, e)} required>
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            <div className="mb-3">
              <label className="form-label">Special Requests</label>
              <textarea className="form-control" name="requests" value={form.requests} onChange={handleChange} rows={3} placeholder="Any special requests?" />
            </div>
            <button type="submit" className="btn btn-primary w-100" style={{ fontWeight: 600, fontSize: 18, padding: "0.7rem 0", borderRadius: 12, background: "linear-gradient(90deg, var(--accent), var(--primary))", border: "none" }}>
              Save Details
            </button>
          </form>
        )}
        {showPayment && !paid && (
          <form onSubmit={handlePay}>
            <h4 style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: 24 }}>Payment Details</h4>
            <div className="mb-3">
              <label className="form-label">Payment Method</label>
              <select className="form-control" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
              </select>
            </div>
            {paymentMethod === 'card' && (
              <>
                <div className="mb-3">
                  <label className="form-label">Card Number</label>
                  <input type="text" className="form-control" name="card" value={payment.card} onChange={handlePaymentChange} required={paymentMethod === 'card'} maxLength={19} placeholder="1234 5678 9012 3456" />
                </div>
                <div className="mb-3 d-flex gap-3">
                  <div style={{ flex: 1 }}>
                    <label className="form-label">Expiry</label>
                    <input type="text" className="form-control" name="expiry" value={payment.expiry} onChange={handlePaymentChange} required={paymentMethod === 'card'} placeholder="MM/YY" maxLength={5} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="form-label">CVV</label>
                    <input type="password" className="form-control" name="cvv" value={payment.cvv} onChange={handlePaymentChange} required={paymentMethod === 'card'} maxLength={4} />
                  </div>
                </div>
              </>
            )}
            {paymentMethod === 'upi' && (
              <div className="mb-3">
                <label className="form-label">UPI ID</label>
                <input type="text" className="form-control" value={upi} onChange={e => setUpi(e.target.value)} required={paymentMethod === 'upi'} placeholder="yourname@upi" />
              </div>
            )}
            <button type="submit" className="btn btn-success w-100" style={{ fontWeight: 600, fontSize: 18, padding: "0.7rem 0", borderRadius: 12 }}>
              Pay Now
            </button>
          </form>
        )}
        {paid && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <h4 style={{ color: 'var(--primary)', fontWeight: 700 }}>Payment Successful!</h4>
            <div style={{ marginTop: 16 }}>Thank you for your booking.</div>
          </div>
        )}
      </div>
    </>
  );
}
