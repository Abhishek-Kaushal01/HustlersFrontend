import React from "react";
import CommonHeading from "../components/common/CommonHeading";
import { facility, luxuryRoomsItems } from "../components/data/Data";
import { Link } from "react-router-dom";

const luxuryRooms = luxuryRoomsItems;

export default function LuxuryRoomsPage() {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <CommonHeading
          heading="Luxury Rooms"
          title="Luxury Rooms"
          subtitle="Explore Our"
        />
        <div className="row g-4">
          {luxuryRooms.length === 0 ? (
            <div className="col-12 text-center py-4" style={{ color: '#888', fontWeight: 600, fontSize: 20 }}>
              No luxury rooms found.
            </div>
          ) : (
            luxuryRooms.map((item, key) => (
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={key}>
                <div className="room-item shadow rounded overflow-hidden unique-room-card" style={{ position: 'relative', background: key % 2 === 0 ? '#fff' : 'var(--light)', boxShadow: '0 8px 32px rgba(15,23,43,0.10)', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                  <div className="position-relative room-image-wrapper" style={{ overflow: 'hidden', height: '240px', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
                    <img className="img-fluid room-image" src={item.img} alt="img" style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', transition: 'transform 0.4s cubic-bezier(.4,2,.6,1)' }} />
                    <div className="room-image-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg,rgba(15,23,43,0.10) 60%,rgba(254,161,22,0.18) 100%)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', pointerEvents: 'none' }}></div>
                    <span style={{ position: 'absolute', top: 16, left: 16, background: 'var(--accent)', color: '#fff', borderRadius: '12px', padding: '0.25rem 1rem', fontWeight: 700, fontSize: '1rem', letterSpacing: '1px', boxShadow: '0 2px 8px rgba(15,23,43,0.10)' }}>{item.name}</span>
                    {item.featured && (
                      <span style={{ position: 'absolute', top: 16, right: 16, background: 'linear-gradient(90deg, var(--primary), var(--accent))', color: '#fff', borderRadius: '12px', padding: '0.25rem 1rem', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '1px', boxShadow: '0 2px 8px rgba(15,23,43,0.10)' }}>Featured</span>
                    )}
                    <span className="room-price-tag" style={{ position: 'absolute', bottom: 16, right: 16, background: 'var(--primary)', color: '#fff', borderRadius: '10px', padding: '0.4rem 1.1rem', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '1px', boxShadow: '0 2px 8px rgba(15,23,43,0.13)', zIndex: 2 }}>
                      {item.price}
                    </span>
                  </div>
                  <div className="p-4 mt-2">
                    <div className="d-flex justify-content-between mb-3 align-items-center">
                      <div className="d-flex align-items-center">{item.star}</div>
                    </div>
                    <div className="d-flex mb-3 flex-wrap">
                      {facility.map((f, index) => (
                        <small className="border-end me-3 pe-3 d-flex align-items-center" key={index}>
                          {f.icon}
                          <span style={{ marginLeft: 4 }}>{f.quantity ? `${f.quantity} ` : ''}{f.facility}</span>
                        </small>
                      ))}
                    </div>
                    <p className="text-body mb-3" style={{ minHeight: '60px' }}>{item.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        className="btn btn-sm btn-primary rounded py-2 px-4 book-now-btn"
                        to={`/rooms/${key}`}
                        style={{ fontWeight: 600, letterSpacing: '1px', boxShadow: '0 2px 8px rgba(15,23,43,0.10)', background: 'linear-gradient(90deg, var(--accent), var(--primary))', border: 'none', color: '#fff', transition: 'background 0.3s, transform 0.2s' }}
                      >
                        {item.yellowbtn}
                      </Link>
                      <Link
                        className="btn btn-sm btn-dark rounded py-2 px-4"
                        to="/booking"
                        state={{ roomId: key }}
                        style={{ fontWeight: 600, letterSpacing: '1px' }}
                      >
                        {item.darkbtn}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 