import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import ScheduleTable from '../components/ScheduleTable';
import ServiceCard from '../components/ServiceCard';
import { API_BASE_URL } from '../config';

function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch(`${API_BASE_URL}/services`);
        const data = await res.json();
        setServices(data.slice(0, 3));
      } catch (err) {
        console.error('Error loading services', err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <>
      <HeroSection />
      <section className="py-5 bg-barber-dark">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6">
              <ScheduleTable />
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <h2 className="h3 text-light mb-3 text-uppercase">
                Modern Men&apos;s Barber Shop in{' '}
                <span className="text-barber-red">Bekaa</span>
              </h2>
              <p className="text-light-75 mb-3">
                Anas Barbershop mixes classic barber culture with a clean,
                modern space. Grab a chair, relax, and let Anas take care of
                your fade, beard and style while you enjoy the atmosphere.
              </p>
              <p className="text-light-75 mb-0">
                We focus on details – sharp lines, smooth blends and clean
                finishes. Whether you&apos;re heading to work, a night out in
                Lebanon, or just want to feel fresh, we&apos;ve got you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-barber-blue-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h3 text-light mb-0 text-uppercase">
              Featured Services
            </h2>
            <a href="/services" className="btn btn-outline-light btn-sm">
              View all services
            </a>
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
    </>
  );
}

export default Home;
