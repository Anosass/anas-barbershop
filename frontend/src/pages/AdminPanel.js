import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { getToken, getUser, clearAuth } from '../utils/auth';

function AdminPanel() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    const user = getUser();
    const token = getToken();

    if (!token || !user) {
      navigate('/login', { replace: true });
      return;
    }
    if (user.role !== 'admin') {
      navigate('/', { replace: true });
      return;
    }

    async function load() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API_BASE_URL}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json?.error || 'Failed to load admin dashboard');
          if (res.status === 401) {
            clearAuth();
            navigate('/login', { replace: true });
          }
          return;
        }
        setData(json);
      } catch (e) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [navigate]);

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h1 className="h3 fw-bold mb-1">Admin Panel</h1>
            <div className="text-light-muted small">Reservations overview</div>
          </div>
        </div>

        {loading && (
          <div className="card bg-barber-blue-light border-0 shadow-sm">
            <div className="card-body">Loading...</div>
          </div>
        )}

        {error && <div className="alert alert-danger py-2">{error}</div>}

        {!loading && data && (
          <>
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-4">
                <div className="card bg-barber-blue-light border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="text-light-muted small">Total reservations</div>
                    <div className="display-6 fw-bold">{data.totalReservations}</div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-8">
                <div className="card bg-barber-blue-light border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="text-light-muted small">Most reserved haircut</div>
                    <div className="h4 fw-bold mb-1">
                      {data.mostReservedHaircut?.name || '—'}
                    </div>
                    <div className="text-light-muted small">
                      {data.mostReservedHaircut?.count ? `${data.mostReservedHaircut.count} reservations` : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-barber-blue-light border-0 shadow-sm mb-4">
              <div className="card-header bg-transparent border-0">
                <div className="fw-bold">Customer emails</div>
                <div className="text-light-muted small">({data.emails?.length || 0} unique)</div>
              </div>
              <div className="card-body">
                {data.emails?.length ? (
                  <div className="d-flex flex-wrap gap-2">
                    {data.emails.map((em) => (
                      <span key={em} className="badge text-bg-dark border border-secondary">
                        {em}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-light-muted">No reservations yet.</div>
                )}
              </div>
            </div>

            <div className="card bg-barber-blue-light border-0 shadow-sm">
              <div className="card-header bg-transparent border-0">
                <div className="fw-bold">Latest reservations</div>
                <div className="text-light-muted small">Showing up to 200</div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-dark table-hover mb-0 align-middle">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Service</th>
                        <th>Preferred day</th>
                        <th>Message</th>
                        <th>Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(data.reservations || []).map((r) => (
                        <tr key={r.id}>
                          <td>{r.name}</td>
                          <td>{r.email}</td>
                          <td>{r.preferredService || '—'}</td>
                          <td>{r.preferredDay || '—'}</td>
                          <td style={{ maxWidth: 360, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {r.message}
                          </td>
                          <td>{r.createdAt ? new Date(r.createdAt).toLocaleString() : '—'}</td>
                        </tr>
                      ))}
                      {!data.reservations?.length && (
                        <tr>
                          <td colSpan="6" className="text-center text-light-muted py-4">
                            No reservations yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default AdminPanel;
