const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

const Service = sequelize.define(
  'Service',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(120), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    durationMinutes: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 30 },
    // NEW: image URL for frontend cards & details
    imageUrl: { type: DataTypes.STRING(500), allowNull: true }
  },
  {
    tableName: 'services',
    timestamps: true
  }
);

module.exports = { Service };
