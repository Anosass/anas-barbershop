const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { submitContact } = require('../controllers/contactController');

router.post(
  '/',
  [
    body('name').isString().isLength({ min: 2, max: 80 }),
    body('email').isEmail().isLength({ max: 120 }),
    body('message').isString().isLength({ min: 10, max: 5000 }),
    body('preferredService').optional().isString().isLength({ max: 120 }),
    body('preferredDay')
      .optional()
      .isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
  ],
  validate,
  submitContact
);

module.exports = router;
