import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadService() {
      try {
        const res = await fetch(`${API_BASE_URL}/services/${id}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setService(data);
      } catch (err) {
        console.error('Error loading service', err);
      } finally {
        setLoading(false);
      }
    }
    loadService();
  }, [id]);

  if (loading) {
    return (
      <section className="py-5 bg-barber-dark">
        <div className="container">
          <p className="text-light">Loading service...</p>
        </div>
      </section>
    );
  }

  if (notFound || !service) {
    return (
      <section className="py-5 bg-barber-dark">
        <div className="container text-light">
          <h2 className="h4 mb-3">Service not found</h2>
          <Link to="/services" className="btn btn-barber-primary">
            Back to services
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-barber-dark">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-6">
            <img
              src={service.imageUrl}
              alt={service.name}
              className="img-fluid rounded-4 shadow service-detail-image"
            />
          </div>
          <div className="col-lg-6">
            <h2 className="h3 text-light text-uppercase mb-2">
              {service.name}
            </h2>
            <p className="text-light-75 mb-3">{service.description}</p>
            <p className="mb-1">
              <span className="badge bg-barber-red me-2">
                ${service.price}
              </span>
              <span className="badge bg-light text-dark">
                {service.duration}
              </span>
            </p>
            <p className="text-light-75 mt-3">
              Every service at Anas Barbershop includes product styling and a
              clean finish so you leave looking and feeling sharp.
            </p>
            <Link to="/contact" className="btn btn-barber-primary me-2">
              Book this service
            </Link>
            <Link to="/services" className="btn btn-outline-light">
              Back to all services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceDetail;
