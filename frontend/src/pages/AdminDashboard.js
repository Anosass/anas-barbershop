import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import { getToken } from '../utils/auth';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`${API_URL}/api/admin/dashboard`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || 'Failed to load dashboard');
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="container py-5">
      <div className="ab-card p-4 rounded-4">
        <h2 className="h4 fw-bold mb-1">Admin Panel</h2>
        <p className="text-white-50 mb-4">Reservations overview</p>

        {loading && <div className="text-white-50">Loading…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {data && (
          <>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="ab-stat p-3 rounded-4">
                  <div className="text-white-50">Total reservations</div>
                  <div className="display-6 fw-bold">{data.totalReservations}</div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="ab-stat p-3 rounded-4">
                  <div className="text-white-50">Most reserved haircut</div>
                  <div className="h3 fw-bold mb-0">
                    {data.mostReservedService?.name || '—'}
                    {data.mostReservedService?.name ? (
                      <span className="text-white-50 fs-6"> ({data.mostReservedService.count})</span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="ab-stat p-3 rounded-4">
              <div className="d-flex align-items-center justify-content-between">
                <h3 className="h6 fw-semibold mb-0">Emails of people who reserved</h3>
                <span className="badge text-bg-dark">{data.reservationEmails?.length || 0}</span>
              </div>
              <hr className="border-secondary" />
              {data.reservationEmails?.length ? (
                <div className="row g-2">
                  {data.reservationEmails.map((email) => (
                    <div className="col-md-6" key={email}>
                      <div className="ab-email">{email}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-white-50">No reservations yet.</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
