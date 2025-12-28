const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

const User = sequelize.define(
  'User',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    fullName: { type: DataTypes.STRING(80), allowNull: false },
    email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING(255), allowNull: false },
    role: { type: DataTypes.ENUM('user', 'admin'), allowNull: false, defaultValue: 'user' }
  },
  {
    tableName: 'users',
    timestamps: true,
    indexes: [{ unique: true, fields: ['email'] }]
  }
);

module.exports = { User };
