const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tbl_users = require("./tbl_users.model.js")(sequelize, Sequelize);
db.tbl_ips = require("./tbl_ips.model.js")(sequelize, Sequelize);
db.tbl_user_address = require("./tbl_user_address.model.js")(
  sequelize,
  Sequelize
);

module.exports = db;
