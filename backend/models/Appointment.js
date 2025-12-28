const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

const Appointment = sequelize.define(
  'Appointment',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    serviceId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    appointmentDate: { type: DataTypes.DATE, allowNull: false },
    notes: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'), allowNull: false, defaultValue: 'pending' }
  },
  {
    tableName: 'appointments',
    timestamps: true,
    indexes: [{ fields: ['userId'] }, { fields: ['serviceId'] }, { fields: ['appointmentDate'] }]
  }
);

module.exports = { Appointment };
