const { Service } = require('../models');

async function getAllServices(req, res, next) {
  try {
    const services = await Service.findAll({ order: [['id', 'ASC']] });
    return res.json(services);
  } catch (err) {
    return next(err);
  }
}

async function getServiceById(req, res, next) {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    return res.json(service);
  } catch (err) {
    return next(err);
  }
}

// Admin CRUD
async function createService(req, res, next) {
  try {
    const { name, description, price, durationMinutes } = req.body;
    const service = await Service.create({ name, description, price, durationMinutes });
    return res.status(201).json(service);
  } catch (err) {
    return next(err);
  }
}

async function updateService(req, res, next) {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });

    const { name, description, price, durationMinutes } = req.body;
    await service.update({ name, description, price, durationMinutes });
    return res.json(service);
  } catch (err) {
    return next(err);
  }
}

async function deleteService(req, res, next) {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    await service.destroy();
    return res.json({ message: 'Service deleted' });
  } catch (err) {
    // Likely FK constraint due to existing appointments
    err.statusCode = 400;
    err.message = 'Cannot delete service that has appointments';
    return next(err);
  }
}

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};
