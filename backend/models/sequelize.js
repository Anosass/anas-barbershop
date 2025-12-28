const { Sequelize } = require('sequelize');

// Reads from environment variables. See .env.example
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? false : false
  }
);

module.exports = { sequelize };
