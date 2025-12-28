import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import ServiceCard from '../components/ServiceCard';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch(`${API_BASE_URL}/services`);
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error('Error loading services', err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <section className="py-5 bg-barber-dark">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h3 text-light text-uppercase mb-1">
              Our Services
            </h2>
            <p className="text-light-75 mb-0">
              Clean fades, sharp beards, and fresh styles for modern men.
            </p>
          </div>
        </div>

        {loading ? (
          <p className="text-light">Loading services...</p>
        ) : (
          <div className="row">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Services;
