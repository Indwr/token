module.exports = (sequelize, Sequelize) => {
  const TblUserAddress = sequelize.define("tbl_user_address", {
    user_id: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    hex_address: {
      type: Sequelize.STRING,
    },
    private_key: {
      type: Sequelize.STRING,
    },
    datetime: {
      type: Sequelize.STRING,
    },
  });

  return TblUserAddress;
};
