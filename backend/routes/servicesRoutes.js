const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} = require('../controllers/servicesController');

router.get('/', getAllServices);
router.get('/:id', getServiceById);

// Admin CRUD
router.post(
  '/',
  requireAuth,
  requireAdmin,
  [
    body('name').isString().isLength({ min: 2, max: 120 }),
    body('description').optional().isString().isLength({ max: 5000 }),
    body('price').isFloat({ min: 0 }).toFloat(),
    body('durationMinutes').isInt({ min: 5, max: 600 }).toInt()
  ],
  validate,
  createService
);

router.put(
  '/:id',
  requireAuth,
  requireAdmin,
  [
    body('name').optional().isString().isLength({ min: 2, max: 120 }),
    body('description').optional().isString().isLength({ max: 5000 }),
    body('price').optional().isFloat({ min: 0 }).toFloat(),
    body('durationMinutes').optional().isInt({ min: 5, max: 600 }).toInt()
  ],
  validate,
  updateService
);

router.delete('/:id', requireAuth, requireAdmin, deleteService);

module.exports = router;
