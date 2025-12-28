const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

router.post(
  '/signup',
  [
    body('fullName').isString().isLength({ min: 2, max: 80 }),
    body('email').isEmail().isLength({ max: 120 }).normalizeEmail(),
    body('password').isString().isLength({ min: 6, max: 100 })
  ],
  validate,
  signup
);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isString().isLength({ min: 1 })
  ],
  validate,
  login
);

module.exports = router;
