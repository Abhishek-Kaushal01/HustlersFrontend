import React, { useRef } from "react";
import { testimonial } from "../data/Data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Sliders() {
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  const next = () => {
    if (sliderRef.current) sliderRef.current.slickNext();
  };
  const previous = () => {
    if (sliderRef.current) sliderRef.current.slickPrev();
  };
  return (
    <div style={{ background: 'linear-gradient(135deg, #f8fafc 60%, #f1f8ff 100%)', padding: '3rem 0', position: 'relative' }}>
      <div className="container position-relative">
        <div style={{ position: 'absolute', top: '50%', left: -22, zIndex: 2, transform: 'translateY(-50%)' }}>
          <button onClick={previous} className="btn btn-light border-0" style={{ borderRadius: '50%', width: 44, height: 44, boxShadow: '0 2px 8px rgba(254,161,22,0.10)', fontSize: 22, color: 'var(--primary)', background: '#fff', transition: 'background 0.2s' }}>
            <i className="fa fa-chevron-left"></i>
          </button>
        </div>
        <div style={{ position: 'absolute', top: '50%', right: -22, zIndex: 2, transform: 'translateY(-50%)' }}>
          <button onClick={next} className="btn btn-light border-0" style={{ borderRadius: '50%', width: 44, height: 44, boxShadow: '0 2px 8px rgba(254,161,22,0.10)', fontSize: 22, color: 'var(--primary)', background: '#fff', transition: 'background 0.2s' }}>
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
        <div className="owl-carousel testimonial-carousel py-5">
          <Slider ref={sliderRef} {...settings}>
            {testimonial.map((item, key) => (
              <div
                key={key}
                className="testimonial-item position-relative bg-white rounded overflow-hidden shadow testimonial-card-eye"
                style={{ border: '3px solid var(--accent)', padding: '2.2rem 1.5rem', minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 32px rgba(254,161,22,0.10)' }}
              >
                <div style={{ position: 'absolute', top: 18, right: 24, opacity: 0.15, fontSize: 60, zIndex: 1 }}>
                  <i className="fa fa-quote-right" style={{ color: 'var(--accent)' }}></i>
                </div>
                <p style={{ fontSize: 18, color: '#333', fontStyle: 'italic', zIndex: 2, position: 'relative' }}>{item.description}</p>
                <div className="d-flex align-items-center mt-4" style={{ zIndex: 2, position: 'relative' }}>
                  <img
                    className="img-fluid flex-shrink-0 rounded-circle border border-3"
                    src={item.img}
                    style={{ width: "64px", height: "64px", borderColor: 'var(--accent)', marginRight: 18 }}
                  />
                  <div className="ps-2">
                    <h6 className="fw-bold mb-1" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 18 }}>{item.name}</h6>
                    <small style={{ color: 'var(--accent)', fontWeight: 600 }}>{item.profession}</small>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <style>{`
          .testimonial-card-eye:hover {
            box-shadow: 0 16px 48px rgba(254,161,22,0.18) !important;
            border-color: var(--primary) !important;
            background: rgba(254,161,22,0.06);
          }
        `}</style>
      </div>
    </div>
  );
}
