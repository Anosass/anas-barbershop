import React from 'react';
import { Link } from 'react-router-dom';

function ServiceCard({ service }) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card service-card h-100 shadow-sm">
        <div className="service-image-wrapper">
          <img
            src={service.imageUrl}
            alt={service.name}
            className="card-img-top service-image"
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-semibold">{service.name}</h5>
          <p className="card-text text-muted small flex-grow-1">
            {service.description}
          </p>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <div>
              <span className="badge bg-barber-red me-2">
                ${service.price}
              </span>
              <span className="badge bg-light text-dark">
                {service.duration}
              </span>
            </div>
            <Link
              to={`/services/${service.id}`}
              className="stretched-link text-barber-blue fw-semibold small"
            >
              View details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
