import React, { useState } from "react";
import axios from "axios";
import Heading from "../components/common/Heading";
import CommonHeading from "../components/common/CommonHeading";
import { contact } from "../components/data/Data";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const backendURL =  process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(
        `${backendURL}/api/contact`,
        formData
      );

      if (response.data.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Heading heading="Contact" title="Home" subtitle="Contact" />
      <div style={{ background: 'linear-gradient(135deg, #f8fafc 60%, #f1f8ff 100%)', padding: '3rem 0' }}>
        <div className="container">
          <CommonHeading
            heading="Contact Us"
            subtitle="Contact "
            title="For Any Query"
          />
          <div style={{ fontSize: 18, color: '#555', marginBottom: 24, fontStyle: 'italic', textAlign: 'center' }}>
            We're here to help! Reach out for any questions, feedback, or booking inquiries.
          </div>
          <div className="row g-4">
            <div className="col-12">
              <div className="row gy-4">
                {contact.map((item, index) => (
                  <div className="col-md-4" key={index}>
                    <div className="p-4 rounded shadow-sm" style={{ background: '#fff', minHeight: 120 }}>
                      <h6 className="section-title text-start text-primary text-uppercase">
                        {item.title}
                      </h6>
                      <p style={{ fontWeight: 500, color: '#444' }}>
                        {item.icon}
                        {item.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-6 wow fadeIn" data-wow-delay="0.1s">
              <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 16px rgba(15,23,43,0.10)' }}>
                <iframe
                  className="position-relative rounded w-100 h-100"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                  frameBorder="0"
                  style={{ minHeight: "350px", border: "0" }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
            </div>
            <div className="col-md-6">
              <div className="wow fadeInUp" data-wow-delay="0.2s">
                <form 
                  style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(15,23,43,0.10)', padding: 24 }}
                  onSubmit={handleSubmit}
                >
                  {success && (
                    <div className="alert alert-success mb-4">
                      Your message has been sent successfully! We'll get back to you soon.
                    </div>
                  )}
                  {error && (
                    <div className="alert alert-danger mb-4">{error}</div>
                  )}
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          placeholder="Subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="subject">Subject</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Leave a message here"
                          id="message"
                          style={{ height: "150px" }}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button 
                        className="btn btn-primary w-100 py-3" 
                        type="submit" 
                        style={{ background: 'linear-gradient(90deg, var(--accent), var(--primary))', border: 'none', fontWeight: 600, fontSize: 18, borderRadius: 12, boxShadow: '0 4px 16px rgba(254,161,22,0.10)', letterSpacing: 1 }}
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
