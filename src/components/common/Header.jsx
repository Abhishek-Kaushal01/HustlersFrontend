import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navList } from "../data/Data";
// import SocialIcons from "./SocialIcons"; // Removed

export default function Header() {
  const [navbarCollapse, setNavbarCollapse] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const userMenuRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      // Try to get user name from localStorage (set after login/register)
      const user = localStorage.getItem("user");
      if (user) {
        try {
          setUserName(JSON.parse(user).name);
        } catch {
          setUserName("");
        }
      } else {
        setUserName("");
      }
    } else {
      setUserName("");
    }
    const handleStorage = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      if (token) {
        const user = localStorage.getItem("user");
        if (user) {
          try {
            setUserName(JSON.parse(user).name);
          } catch {
            setUserName("");
          }
        } else {
          setUserName("");
        }
      } else {
        setUserName("");
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserMenuOpen(false);
    setUserName("");
    navigate("/login");
  };

  const handleMouseEnter = (itemId) => {
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <div className="container-fluid bg-dark px-0 sticky-top" style={{ zIndex: 1050 }}>
        <div className="row gx-0">
          <div className="col-lg-3 bg-dark d-none d-lg-block">
            <Link
              to="/"
              className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
            >
              <h1 className="m-0 text-primary text-uppercase">Hustler</h1>
            </Link>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
              <Link to="/" className="navbar-brand d-block d-lg-none">
                <h1 className="m-0 text-primary text-uppercase">Hustler</h1>
              </Link>
              <button
                type="button"
                className="navbar-toggler"
                onClick={() => setNavbarCollapse(!navbarCollapse)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className={
                  navbarCollapse
                    ? "navbar-collapse justify-content-between navbarCollapse"
                    : "collapse navbar-collapse justify-content-between"
                }
              >
                <div className="navbar-nav mr-auto py-0">
                  {navList.map((item, index) => (
                    <div key={index}>
                      {item.subItems ? (
                        <div
                          className="nav-item dropdown"
                          onMouseEnter={() => handleMouseEnter(item.id)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <Link className="nav-link dropdown-toggle">
                            {item.text}
                          </Link>
                          <div
                            className={`dropdown-menu rounded-0 m-0 ${
                              activeDropdown === item.id ? "show" : ""
                            }`}
                          >
                            {item.subItems.map((sub) => (
                              <Link to={sub.path} className="dropdown-item" key={sub.id}>
                                {sub.text}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link to={item.path} className="nav-item nav-link">
                          {item.text}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
                {/* Auth links, icon and name slightly left */}
                <div className="d-flex align-items-center gap-2 position-relative" style={{ minHeight: 56, marginRight: 32 }}>
                  {!isLoggedIn ? (
                    <>
                      <Link to="/login" className="nav-item nav-link">Login</Link>
                      <Link to="/register" className="nav-item nav-link">Register</Link>
                    </>
                  ) : (
                    <div className="nav-item dropdown d-flex align-items-center" ref={userMenuRef}>
                      <span className="me-2 text-white" style={{ fontWeight: 500, fontSize: 16 }}>{userName}</span>
                      <button
                        className="btn nav-link p-0 border-0 bg-transparent d-flex align-items-center justify-content-center"
                        style={{
                          color: '#fff',
                          textDecoration: 'none',
                          fontSize: 28,
                          borderRadius: '50%',
                          border: '2px solid #fff',
                          width: 44,
                          height: 44,
                          background: userMenuOpen ? '#222' : '#343a40',
                          transition: 'background 0.2s',
                          boxShadow: userMenuOpen ? '0 0 0 2px #0d6efd' : 'none',
                          cursor: 'pointer',
                        }}
                        onClick={() => setUserMenuOpen((open) => !open)}
                        aria-label="User menu"
                        onMouseEnter={e => e.currentTarget.style.background = '#222'}
                        onMouseLeave={e => e.currentTarget.style.background = userMenuOpen ? '#222' : '#343a40'}
                      >
                        <i className="fa fa-user" style={{ borderRadius: '50%' }}></i>
                      </button>
                      <div
                        className={`dropdown-menu dropdown-menu-end mt-2${userMenuOpen ? ' show' : ''}`}
                        style={{ minWidth: 170, right: 0, left: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                      >
                        <Link to="/change-password" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                          Change Password
                        </Link>
                        <button className="dropdown-item" onClick={handleLogout}>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
