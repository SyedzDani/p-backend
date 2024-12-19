const DataTypes = require('sequelize');
const sequelize = require('../config/dbconnection');

const db = {};

db.DataTypes = DataTypes;
db.sequelize = sequelize;

module.exports = db;