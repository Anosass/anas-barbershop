const { ContactMessage } = require('../models');
const { sequelize } = require('../models');

async function getDashboard(req, res, next) {
  try {
    const totalReservations = await ContactMessage.count();

    // Most reserved haircut/service (based on preferredService from contact form)
    const [topRow] = await sequelize.query(
      `
      SELECT preferredService AS service, COUNT(*) AS count
      FROM contact_messages
      WHERE preferredService IS NOT NULL AND preferredService <> ''
      GROUP BY preferredService
      ORDER BY count DESC
      LIMIT 1
      `
    );

    const mostReservedHaircut = topRow && topRow[0]
      ? { name: topRow[0].service, count: Number(topRow[0].count) }
      : { name: null, count: 0 };

    const reservations = await ContactMessage.findAll({
      order: [['createdAt', 'DESC']],
      limit: 200
    });

    // Unique emails list (gmails of people who reserved)
    const emails = Array.from(
      new Set(reservations.map((r) => (r.email || '').trim()).filter(Boolean))
    );

    return res.json({
      totalReservations,
      mostReservedHaircut,
      emails,
      reservations
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getDashboard };
