const nodemailer = require('nodemailer');
const { ContactMessage } = require('../models');

async function maybeSendEmailNotification(contact) {
  const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_FROM } = process.env;
  if (!MAIL_HOST || !MAIL_PORT || !MAIL_USER || !MAIL_PASS) return;

  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: Number(MAIL_PORT),
    secure: Number(MAIL_PORT) === 465,
    auth: { user: MAIL_USER, pass: MAIL_PASS }
  });

  await transporter.sendMail({
    from: MAIL_FROM || 'no-reply@anas-barbershop.local',
    to: MAIL_USER,
    subject: `New contact message from ${contact.name}`,
    text: `Email: ${contact.email}\nPreferred Service: ${contact.preferredService || '-'}\nPreferred Day: ${contact.preferredDay || '-'}\n\nMessage:\n${contact.message}`
  });
}

async function submitContact(req, res, next) {
  try {
    const { name, email, message, preferredService, preferredDay } = req.body;

    const contact = await ContactMessage.create({
      name,
      email,
      message,
      preferredService: preferredService || null,
      preferredDay: preferredDay || null
    });

    // Optional bonus: Email notification if SMTP env vars exist
    try {
      await maybeSendEmailNotification(contact);
    } catch (e) {
      // Do not fail the request if email fails
      if (process.env.NODE_ENV !== 'production') console.warn('Email notification failed:', e.message);
    }

    return res.status(201).json({
      message: 'Thank you for reaching out. We will get back to you soon.',
      contactId: contact.id
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { submitContact };
