import React, { useState } from 'react';
import { API_BASE_URL } from '../config';

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    preferredService: '',
    preferredDay: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setServerErrors([]);
    setSuccessMessage('');

    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setServerErrors(data.errors || ['Something went wrong.']);
      } else {
        setSuccessMessage(
          'Thank you for contacting Anas Barbershop. We will reply soon.'
        );
        setForm({
          name: '',
          email: '',
          message: '',
          preferredService: '',
          preferredDay: ''
        });
      }
    } catch (err) {
      console.error('Contact submit error', err);
      setServerErrors(['Network error, please try again.']);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="py-5 bg-barber-dark">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-5">
            <h2 className="h3 text-light text-uppercase mb-3">
              Contact & Location
            </h2>
            <p className="text-light-75">
              Anas Barbershop is located in <strong>Bekaa, Lebanon</strong>.
              We&apos;re easy to reach from the surrounding villages and town
              centers. Pass by for a walk-in or message us to fix a time.
            </p>
            <p className="text-light-75">
              <strong>Address:</strong> Bekaa, Lebanon
              <br />
              <strong>Email:</strong>{' '}
              <a href="mailto:anasassi@gmail.com" className="text-barber-red">
                anasassi@gmail.com
              </a>
            </p>
            <p className="text-light-75 mb-3">
              <strong>Opening hours:</strong> Monday – Saturday, 10:00 – 20:00.
              Sunday closed.
            </p>
            <div className="contact-info-card p-3 rounded-3 bg-barber-blue-light text-light-75">
              <p className="mb-1">
                • Use the form to request an appointment or ask a question.
              </p>
              <p className="mb-1">
                • Tell us which service you want and which day works for you.
              </p>
              <p className="mb-0">
                • We&apos;ll confirm by email as soon as possible.
              </p>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card bg-barber-blue border-0 shadow-sm">
              <div className="card-body">
                <h3 className="h5 text-light mb-3 text-uppercase">
                  Send a Message
                </h3>

                {serverErrors.length > 0 && (
                  <div className="alert alert-danger py-2">
                    <ul className="mb-0 small">
                      {serverErrors.map((err, index) => (
                        <li key={index}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {successMessage && (
                  <div className="alert alert-success py-2 small">
                    {successMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label text-light">
                      Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-light">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="preferredService"
                      className="form-label text-light"
                    >
                      Preferred Service (optional)
                    </label>
                    <input
                      type="text"
                      id="preferredService"
                      name="preferredService"
                      className="form-control"
                      placeholder="e.g. Classic Skin Fade"
                      value={form.preferredService}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="preferredDay"
                      className="form-label text-light"
                    >
                      Preferred Day (optional)
                    </label>
                    <select
                      id="preferredDay"
                      name="preferredDay"
                      className="form-select"
                      value={form.preferredDay}
                      onChange={handleChange}
                    >
                      <option value="">Select a day</option>
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Saturday</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="message"
                      className="form-label text-light"
                    >
                      Message*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      rows="4"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-barber-primary"
                    disabled={submitting}
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
