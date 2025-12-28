const express = require('express');
const { body } = require('express-validator');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const {
  listAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentsController');

const router = express.Router();

router.get('/', requireAuth, listAppointments);

router.post(
  '/',
  requireAuth,
  [
    body('serviceId').isInt({ min: 1 }).toInt(),
    body('appointmentDate').isISO8601().toDate(),
    body('notes').optional().isString().isLength({ max: 5000 })
  ],
  validate,
  createAppointment
);

router.put(
  '/:id',
  requireAuth,
  [
    body('serviceId').optional().isInt({ min: 1 }).toInt(),
    body('appointmentDate').optional().isISO8601().toDate(),
    body('notes').optional().isString().isLength({ max: 5000 }),
    body('status').optional().isIn(['pending', 'confirmed', 'completed', 'cancelled'])
  ],
  validate,
  updateAppointment
);

router.delete('/:id', requireAuth, deleteAppointment);

module.exports = router;
