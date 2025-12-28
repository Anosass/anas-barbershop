import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { setAuth } from '../utils/auth';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Signup failed');
        return;
      }

      setAuth(data.token, data.user);
      navigate('/', { replace: true });
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-7 col-lg-5">
            <div className="card bg-barber-blue-light border-0 shadow-lg">
              <div className="card-body p-4">
                <h2 className="h4 fw-bold mb-1">Create account</h2>
                <p className="text-light-muted mb-4">Join Anas Barbershop</p>

                {error && <div className="alert alert-danger py-2 small">{error}</div>}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label">Full name</label>
                    <input
                      className="form-control bg-dark text-light border-0"
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      className="form-control bg-dark text-light border-0"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      className="form-control bg-dark text-light border-0"
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Min 6 characters"
                      required
                    />
                  </div>

                  <button className="btn btn-barber-primary w-100" disabled={submitting}>
                    {submitting ? 'Creating...' : 'Sign up'}
                  </button>
                </form>

                <div className="mt-3 small">
                  Already have an account?{' '}
                  <Link to="/login" className="text-decoration-none text-danger">
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
