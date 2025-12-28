import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { clearAuth, getUser } from '../utils/auth';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    function sync() {
      setUser(getUser());
    }
    window.addEventListener('authChanged', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('authChanged', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  function logout() {
    clearAuth();
    navigate('/', { replace: true });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-barber-blue shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-uppercase" to="/">
          <span className="brand-pole me-2" />
          Anas Barbershop
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <NavLink end className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services">
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>

            {user?.role === 'admin' && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              </li>
            )}

            {!user ? (
              <>
                <li className="nav-item ms-lg-3">
                  <NavLink className="btn btn-sm btn-outline-light px-3" to="/login">
                    Sign in
                  </NavLink>
                </li>
                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <NavLink className="btn btn-sm btn-barber-primary px-3" to="/signup">
                    Sign up
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item ms-lg-3">
                <button className="btn btn-sm btn-outline-light px-3" onClick={logout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
