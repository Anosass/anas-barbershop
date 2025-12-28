require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { initDb, Service, User } = require('./models');
const { errorHandler } = require('./middleware/errorHandler');

const servicesRoutes = require('./routes/servicesRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const appointmentsRoutes = require('./routes/appointmentsRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Anas Barbershop API is running 💈');
});

app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

async function seedIfEmpty() {
  // Seed a few default services (only if DB is empty)
  const count = await Service.count();
  if (count === 0) {
    await Service.bulkCreate([
      { name: 'Haircut', description: 'Classic haircut and styling.', price: 10, durationMinutes: 30 },
      { name: 'Beard Trim', description: 'Beard shaping and trim.', price: 7.5, durationMinutes: 20 },
      { name: 'Haircut + Beard', description: 'Full package.', price: 15, durationMinutes: 50 }
    ]);
  }

  // Ensure the required admin user exists (email: 22230528@students.liu.edu.lb, password: anas123)
  const adminEmail = '22230528@students.liu.edu.lb';
  const admin = await User.findOne({ where: { email: adminEmail } });
  if (!admin) {
    const bcrypt = require('bcryptjs');
    const passwordHash = await bcrypt.hash('anas123', 12);
    await User.findOrCreate({
      where: { email: '22230528@students.liu.edu.lb' },
      defaults: { fullName: 'Admin', email: '22230528@students.liu.edu.lb', passwordHash, role: 'admin' }
    });
  }
}

(async () => {
  await initDb();
  await seedIfEmpty();

  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
})().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});