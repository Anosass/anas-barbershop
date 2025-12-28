const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

function signToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

async function signup(req, res, next) {
  try {
    const { fullName, email, password } = req.body;
    // Prevent creating an account using the admin email
    if ((email || '').toLowerCase() === '22230528@students.liu.edu.lb') {
      return res.status(403).json({ error: 'This email is reserved for admin login' });
    }
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ error: 'Email is already registered' });

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({ fullName, email, passwordHash, role: 'user' });
    const token = signToken(user);

    return res.status(201).json({
      token,
      user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role }
    });
  } catch (err) {
    return next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid email or password' });

    const token = signToken(user);
    return res.json({
      token,
      user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role }
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { signup, login };