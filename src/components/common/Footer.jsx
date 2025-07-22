import { Link } from "react-router-dom";
import { footerContact, footerItem, socialIcons } from "../data/Data";

export default function Footer() {
  return (
    <>
      <div
        className="container-fluid bg-dark text-light footer wow fadeIn d-flex flex-column align-items-center justify-content-center"
        data-wow-delay="0.1s"
        style={{ borderTop: '6px solid var(--primary)', boxShadow: '0 -2px 16px rgba(15,23,43,0.08)', marginTop: '48px' }}
      >
        <div className="container pb-5 text-center px-2 px-md-4">
          <div className="row g-4 g-lg-5 flex-column flex-lg-row align-items-stretch">
            <div className="col-12 col-lg-4 mb-4 mb-lg-0 d-flex flex-column align-items-center align-items-lg-start">
              <div className="bg-primary rounded p-4 w-100 mb-3 mb-lg-0">
                <Link to="/">
                  <h1 className="text-white text-uppercase mb-3">Hustler</h1>
                </Link>
                <p className="text-white mb-0">
                  Hustlers – Find Your Perfect Stay, Hustle-Free
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-3 mb-4 mb-lg-0 d-flex flex-column align-items-center align-items-lg-start">
              <h6 className="section-title text-primary text-uppercase mb-4">Contact</h6>
              {footerContact.map((val, index) => (
                <p className="mb-2" key={index}>
                  {val.icon} {val.name}
                </p>
              ))}
              <div className="d-flex pt-2 justify-content-center justify-content-lg-start">
                {socialIcons.slice(0, 4).map((val, index) => (
                  <a className="btn btn-outline-light btn-social mx-1" href="" key={index}>
                    {val.icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="col-12 col-lg-5 d-flex flex-column align-items-center align-items-lg-start">
              <div className="row gy-4 g-4 w-100">
                {footerItem.map((section, sectionIndex) => (
                  <div className="col-12 col-md-6" key={sectionIndex}>
                    <h6 className="section-title text-primary text-uppercase mb-4">
                      {section.header}
                    </h6>
                    {section.UnitItem.map((item, itemIndex) => (
                      <a className="btn btn-link" href="" key={itemIndex}>
                        {item.name}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
