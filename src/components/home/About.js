import React from "react";
import Heading from "../common/Heading";
import { about } from "../data/Data";

export default function About() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #f8fafc 60%, #f1f8ff 100%)', padding: '3rem 0' }}>
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <h6 className="section-title text-start text-primary text-uppercase">
              About Us
            </h6>
            <h1 className="mb-3">
              Welcome to <span className="text-primary text-uppercase">Hustler</span>
            </h1>
            <div style={{ fontSize: 18, color: '#555', marginBottom: 18, fontStyle: 'italic' }}>
              Your comfort, our passion. Experience luxury and warmth in every stay.
            </div>
            <p className="mb-4">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
              Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
              sed stet lorem sit clita duo justo magna dolore erat amet
            </p>
            <div className="row g-3 pb-4">
              {about.map((item, key) => (
                <div className="col-sm-4 wow fadeIn" data-wow-delay="0.1s" key={key}>
                  <div className="border-0 rounded shadow-sm p-1" style={{ background: '#fff' }}>
                    <div className="border-0 rounded text-center p-4" style={{ boxShadow: '0 4px 16px rgba(15,23,43,0.07)' }}>
                      {item.icon}
                      <h2 className="mb-1" data-toggle="counter-up" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 32 }}>
                        {item.count}
                      </h2>
                      <p className="mb-0" style={{ color: '#555', fontWeight: 500 }}>{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <a className="btn btn-primary py-3 px-5 mt-2" href="" style={{ background: 'linear-gradient(90deg, var(--accent), var(--primary))', border: 'none', fontWeight: 600, fontSize: 18, borderRadius: 12, boxShadow: '0 4px 16px rgba(254,161,22,0.10)', letterSpacing: 1 }}>
              Explore More
            </a>
          </div>
          <div className="col-lg-6">
            <div className="row g-3" style={{ boxShadow: '0 8px 32px rgba(15,23,43,0.10)', borderRadius: 18, background: '#fff', padding: 16 }}>
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-75 wow zoomIn"
                  data-wow-delay="0.1s"
                  src="/assets/img/about-1.jpg"
                  style={{ marginTop: "25%", border: '4px solid #f1f8ff' }}
                />
              </div>
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-100 wow zoomIn"
                  data-wow-delay="0.3s"
                  src="/assets/img/about-2.jpg"
                  style={{ border: '4px solid #f1f8ff' }}
                />
              </div>
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-50 wow zoomIn"
                  data-wow-delay="0.5s"
                  src="/assets/img/about-3.jpg"
                  style={{ border: '4px solid #f1f8ff' }}
                />
              </div>
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-75 wow zoomIn"
                  data-wow-delay="0.7s"
                  src="/assets/img/about-4.jpg"
                  style={{ border: '4px solid #f1f8ff' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
