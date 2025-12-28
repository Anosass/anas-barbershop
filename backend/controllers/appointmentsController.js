const { Appointment, Service, User } = require('../models');

// User can only see their own appointments. Admin can see all.
async function listAppointments(req, res, next) {
  try {
    const where = req.user.role === 'admin' ? {} : { userId: req.user.id };
    const items = await Appointment.findAll({
      where,
      order: [['appointmentDate', 'ASC']],
      include: [
        { model: Service, attributes: ['id', 'name', 'price', 'durationMinutes'] },
        { model: User, attributes: ['id', 'fullName', 'email'] }
      ]
    });

    return res.json(items);
  } catch (err) {
    return next(err);
  }
}

async function createAppointment(req, res, next) {
  try {
    const { serviceId, appointmentDate, notes } = req.body;

    // Basic availability check: disallow booking same service at same exact datetime
    const exists = await Appointment.findOne({ where: { serviceId, appointmentDate } });
    if (exists) return res.status(409).json({ error: 'This time slot is already booked for the selected service.' });

    const appt = await Appointment.create({
      userId: req.user.id,
      serviceId,
      appointmentDate,
      notes: notes || null,
      status: 'pending'
    });

    return res.status(201).json(appt);
  } catch (err) {
    return next(err);
  }
}

async function updateAppointment(req, res, next) {
  try {
    const appt = await Appointment.findByPk(req.params.id);
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });

    // Ownership check
    if (req.user.role !== 'admin' && appt.userId !== req.user.id) {
      return res.status(403).json({ error: 'You can only edit your own appointments' });
    }

    const { serviceId, appointmentDate, notes, status } = req.body;

    if (serviceId || appointmentDate) {
      const nextServiceId = serviceId || appt.serviceId;
      const nextDate = appointmentDate || appt.appointmentDate;
      const clash = await Appointment.findOne({
        where: { serviceId: nextServiceId, appointmentDate: nextDate }
      });
      if (clash && clash.id !== appt.id) {
        return res.status(409).json({ error: 'This time slot is already booked for the selected service.' });
      }
    }

    await appt.update({
      serviceId: serviceId ?? appt.serviceId,
      appointmentDate: appointmentDate ?? appt.appointmentDate,
      notes: notes ?? appt.notes,
      status: status ?? appt.status
    });

    return res.json(appt);
  } catch (err) {
    return next(err);
  }
}

async function deleteAppointment(req, res, next) {
  try {
    const appt = await Appointment.findByPk(req.params.id);
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });

    if (req.user.role !== 'admin' && appt.userId !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete your own appointments' });
    }

    await appt.destroy();
    return res.json({ message: 'Appointment deleted' });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  listAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
};
