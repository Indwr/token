module.exports = (sequelize, Sequelize) => {
    const TblUsers = sequelize.define("tbl_users", {
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      }
    });
  
    return TblUsers;
  };