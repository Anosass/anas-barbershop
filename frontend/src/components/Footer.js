import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-barber text-light py-4 mt-auto">
      <div className="container">
        <div className="row gy-3 align-items-center">
          <div className="col-md-4 text-center text-md-start">
            <h5 className="mb-1">Anas Barbershop</h5>
            <p className="mb-1 small">Bekaa, Lebanon</p>
            <p className="mb-0 small">
              Email: <a href="mailto:anasassi@gmail.com" className="footer-link">anasassi@gmail.com</a>
            </p>
          </div>
          <div className="col-md-4 text-center">
            <p className="mb-1 small text-uppercase fw-semibold">
              Opening Hours
            </p>
            <p className="mb-0 small">
              Mon – Sat: 10:00 – 20:00<br />
              Sunday: Closed
            </p>
          </div>
          <div className="col-md-4 text-center text-md-end">
            <p className="mb-1 small">Quick Links</p>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 small">
              <Link to="/services" className="footer-link">
                Services
              </Link>
              <Link to="/about" className="footer-link">
                About
              </Link>
              <Link to="/contact" className="footer-link">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <hr className="border-barber my-3" />
        <p className="text-center mb-0 small">
          © {new Date().getFullYear()} Anas Barbershop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
