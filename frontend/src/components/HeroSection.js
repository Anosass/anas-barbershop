import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="hero-section py-5 py-lg-6">
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-uppercase text-light mb-3">
              Sharp Cuts, <span className="text-barber-red">Real Style</span>
            </h1>
            <p className="lead text-light-75 mb-4">
              Welcome to <strong>Anas Barbershop</strong> – a modern men&apos;s
              grooming spot in Bekaa, Lebanon. Classic fades, clean beards and
              a relaxed atmosphere with Lebanese hospitality.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/services" className="btn btn-barber-primary btn-lg">
                View Services
              </Link>
              <Link
                to="/contact"
                className="btn btn-outline-light btn-lg border-barber-light"
              >
                Book an Appointment
              </Link>
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-lg-end justify-content-center">
            <div className="hero-image-wrapper shadow-lg">
              <img
                src="https://images.pexels.com/photos/27467943/pexels-photo-27467943.jpeg?cs=srgb&dl=pexels-clark07-27467943.jpg&fm=jpg"
                alt="Fresh haircut at Anas Barbershop"
                className="img-fluid rounded-4 hero-image"
              />
              <div className="hero-badge bg-barber-red text-light">
                Lebanon • Bekaa
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
