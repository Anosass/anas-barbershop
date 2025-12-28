const { sequelize } = require('./sequelize');
const { User } = require('./User');
const { Service } = require('./Service');
const { Appointment } = require('./Appointment');
const { ContactMessage } = require('./ContactMessage');

// Associations (two related entities requirement: Users <-> Appointments)
User.hasMany(Appointment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Appointment.belongsTo(User, { foreignKey: 'userId' });

Service.hasMany(Appointment, { foreignKey: 'serviceId', onDelete: 'RESTRICT' });
Appointment.belongsTo(Service, { foreignKey: 'serviceId' });

async function initDb() {
  await sequelize.authenticate();
  // For coursework/demo simplicity we auto-create tables.
  // In production you would use migrations.
  await sequelize.sync();
}

module.exports = {
  sequelize,
  initDb,
  User,
  Service,
  Appointment,
  ContactMessage
};
