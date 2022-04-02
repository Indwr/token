const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const path = require("path");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,
//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle,
//   },
// });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tblTotalStacked = require("./tbl_total_stacked_token.model.js")(
  sequelize,
  Sequelize
);
db.tbl_user_address = require("./tbl_user_address.model.js")(
  sequelize,
  Sequelize
);

module.exports = db;
