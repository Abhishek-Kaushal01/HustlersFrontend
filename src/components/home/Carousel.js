import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { carouselData } from "../data/Data";
import { useNavigate } from "react-router-dom";

export default function Carousel() {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  // Custom styles for the Book Room button
  const buttonStyle = {
    borderRadius: 12,
    background: 'var(--primary)', // Use your site's primary blue
    color: '#fff',
    border: 'none',
    fontWeight: 700,
    fontSize: 20,
    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
    transition: 'background 0.2s, color 0.2s',
  };

  return (
    <>
      <div className="container-fluid p-0 mb-5">
        <div
          id="header-carousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <Slider ref={sliderRef} {...settings}>
              {carouselData.map((val, index) => (
                <div className="carousel-item" key={index}>
                  <img className="w-100" src={val.img} alt="Image" />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{ maxWidth: "700px" }}>
                      <h6 className="section-title text-white text-uppercase mb-3 animated slideInDown">
                        {val.subtitle}
                      </h6>
                      <h1 className="display-3 text-white mb-4 animated slideInDown">
                        {val.title}
                      </h1>
                      <button
                        className="btn animated slideInRight fw-bold fs-5 shadow book-room-btn"
                        style={buttonStyle}
                        onClick={() => navigate('/rooms')}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = '#ffc107';
                          e.currentTarget.style.color = '#222';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'var(--primary)';
                          e.currentTarget.style.color = '#fff';
                        }}
                      >
                        Book Room
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            onClick={previous}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            onClick={next}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}
