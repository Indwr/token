module.exports = (sequelize, Sequelize) => {
  const TblIps = sequelize.define("tbl_ips", {
    ip_address: {
      type: Sequelize.STRING,
    },
    user_id: {
      type: Sequelize.STRING,
    },
  });

  return TblIps;
};
