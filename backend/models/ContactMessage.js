const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

const ContactMessage = sequelize.define(
  'ContactMessage',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(80), allowNull: false },
    email: { type: DataTypes.STRING(120), allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    preferredService: { type: DataTypes.STRING(120), allowNull: true },
    preferredDay: { type: DataTypes.STRING(20), allowNull: true }
  },
  {
    tableName: 'contact_messages',
    timestamps: true
  }
);

module.exports = { ContactMessage };
