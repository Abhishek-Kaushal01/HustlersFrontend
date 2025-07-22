import React from "react";
import CommonHeading from "../common/CommonHeading";
import { services } from "../data/Data";

export default function Services() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #f8fafc 60%, #f1f8ff 100%)', padding: '3rem 0' }}>
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <CommonHeading
            heading="Our Services"
            title="Services"
            subtitle="Explore Our"
          />
          <div style={{ fontSize: 18, color: '#555', marginBottom: 24, fontStyle: 'italic' }}>
            Discover the premium amenities and experiences we offer for your comfort and delight.
          </div>
        </div>
        <div className="row g-4">
          {services.map((item, index) => (
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={index}>
              <div className="service-item rounded shadow-sm service-card-hover" style={{ background: '#fff', padding: '2.2rem 1.5rem', boxShadow: '0 4px 16px rgba(15,23,43,0.07)', border: 'none', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                <div className="service-icon bg-transparent border-0 rounded p-1 mb-3" style={{ fontSize: 48, color: 'var(--primary)' }}>
                  <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                    {item.icon}
                  </div>
                </div>
                <h5 className="mb-3" style={{ fontWeight: 700 }}>{item.name}</h5>
                <p className="text-body mb-0" style={{ color: '#555', fontWeight: 500 }}>{item.discription}</p>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          .service-card-hover:hover {
            transform: translateY(-8px) scale(1.03);
            box-shadow: 0 16px 48px rgba(15,23,43,0.13) !important;
            border-color: var(--primary) !important;
            background: rgba(254,161,22,0.08);
          }
          .service-card-hover:hover .service-icon {
            color: var(--accent) !important;
          }
          .service-card-hover:hover h5 {
            color: var(--accent) !important;
          }
        `}</style>
      </div>
    </div>
  );
}
