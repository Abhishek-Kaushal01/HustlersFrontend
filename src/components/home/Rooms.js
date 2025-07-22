import React, { useState } from "react";
import CommonHeading from "../common/CommonHeading";
import { facility, roomItems } from "../data/Data";
import { Link } from "react-router-dom";

const roomTypes = Array.from(new Set(roomItems.map(r => r.name)));
const priceRanges = [
  { label: "Any", value: "" },
  { label: "$50 - $100", value: "50-100" },
  { label: "$101 - $150", value: "101-150" },
  { label: "$151 - $200", value: "151-200" },
  { label: "$201+", value: "201-10000" },
];
const features = ["Family", "Luxury", "Standard", "Dormitory", "Business", "Penthouse"];

function filterRooms(filters) {
  return roomItems.filter(room => {
    if (filters.type && room.name !== filters.type) return false;
    if (filters.price) {
      const priceNum = Number(room.price.replace(/[^0-9]/g, ""));
      const [min, max] = filters.price.split("-").map(Number);
      if (priceNum < min || priceNum > max) return false;
    }
    if (filters.feature) {
      const f = filters.feature.toLowerCase();
      if (!room.name.toLowerCase().includes(f) && !room.description.toLowerCase().includes(f)) return false;
    }
    return true;
  });
}

export default function Rooms({ limit }) {
  const [filters, setFilters] = useState({
    type: "",
    price: "",
    guests: 1,
    feature: "",
  });
  const [results, setResults] = useState(roomItems);
  const handleChange = e => {
    const { name, value } = e.target;
    setFilters(f => ({ ...f, [name]: value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    const filtered = filterRooms(filters);
    setResults(filtered);
  };
  // Limit the number of rooms if 'limit' prop is provided
  const displayedRooms = limit ? results.slice(0, limit) : results;
  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <CommonHeading
            heading="Our Rooms"
            title="Rooms"
            subtitle="Explore Our"
          />
          {/* Filter Section */}
          <div className="mx-auto" style={{ maxWidth: 900 }}>
            <div className="bg-white shadow rounded-4" style={{ padding: "2.5rem 2rem 2rem 2rem", marginTop: 24, marginBottom: 32 }}>
              <form onSubmit={handleSubmit}>
                <div className="row g-4 align-items-end">
                  <div className="col-md-3">
                    <label className="form-label mb-1" style={{ fontWeight: 600 }}>Room Type</label>
                    <select className="form-select" name="type" value={filters.type} onChange={handleChange}>
                      <option value="">Any</option>
                      {roomTypes.map((type, i) => (
                        <option value={type} key={i}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label mb-1" style={{ fontWeight: 600 }}>Price Range</label>
                    <select className="form-select" name="price" value={filters.price} onChange={handleChange}>
                      {priceRanges.map((pr, i) => (
                        <option value={pr.value} key={i}>{pr.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label mb-1" style={{ fontWeight: 600 }}>Guests</label>
                    <input type="number" className="form-control" name="guests" min={1} max={10} value={filters.guests} onChange={handleChange} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label mb-1" style={{ fontWeight: 600 }}>Feature</label>
                    <select className="form-select" name="feature" value={filters.feature} onChange={handleChange}>
                      <option value="">Any</option>
                      {features.map((f, i) => (
                        <option value={f} key={i}>{f}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-1 d-flex align-items-end">
                    <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center" type="submit" style={{ fontWeight: 600, borderRadius: 10, fontSize: 20, height: 44 }}>
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* Results Section */}
          <div className="row g-4">
            {displayedRooms.length === 0 ? (
              <div className="col-12 text-center py-4" style={{ color: '#888', fontWeight: 600, fontSize: 20 }}>
                No rooms found matching your criteria.
              </div>
            ) : (
              displayedRooms.map((item, key) => (
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
      <style>
        {`
.unique-room-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 20px 56px rgba(15,23,43,0.22) !important;
  border-color: var(--primary) !important;
}
.unique-room-card:hover .room-image {
  transform: scale(1.08) rotate(-1deg);
}
.book-now-btn:hover {
  background: linear-gradient(90deg, var(--primary), var(--accent));
  color: #fff;
  transform: scale(1.07);
  box-shadow: 0 6px 24px rgba(254,161,22,0.18);
}
`}
      </style>
    </>
  );
}
