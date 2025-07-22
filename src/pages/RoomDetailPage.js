import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { roomItems, facility } from "../components/data/Data";

export default function RoomDetailPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const room = roomItems[roomId];
  if (!room) return <div style={{ padding: 40, textAlign: 'center' }}>Room not found.</div>;
  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px rgba(15,23,43,0.10)', padding: '2rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <img src={room.img} alt={room.name} style={{ width: 360, height: 260, objectFit: 'cover', borderRadius: 16, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 240 }}>
          <h2 style={{ fontWeight: 700, color: 'var(--primary)' }}>{room.name}</h2>
          <div style={{ margin: '0.5rem 0', fontSize: 18, color: 'var(--accent)', fontWeight: 600 }}>{room.price}</div>
          <div style={{ margin: '0.5rem 0', display: 'flex', gap: 8 }}>{room.star}</div>
          <div style={{ margin: '1rem 0', display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {facility.map((f, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--light)', borderRadius: 8, padding: '0.3rem 0.8rem', fontWeight: 500, fontSize: 15 }}>
                {f.icon}
                <span style={{ marginLeft: 4 }}>{f.quantity ? `${f.quantity} ` : ''}{f.facility}</span>
              </span>
            ))}
          </div>
          <p style={{ color: '#444', fontSize: 16 }}>{room.description}</p>
          <button
            className="btn btn-primary"
            style={{ marginTop: 16, fontWeight: 600, fontSize: 17, padding: '0.7rem 2.2rem', borderRadius: 12, background: 'linear-gradient(90deg, var(--accent), var(--primary))', border: 'none' }}
            onClick={() => navigate('/booking', { state: { roomId } })}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
} 