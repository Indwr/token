module.exports = (sequelize, Sequelize) => {
  const TotalStacked = sequelize.define("totalStacked", {
    totalTokens: {
      type: Sequelize.FLOAT,
    },
    type: Sequelize.STRING,
  });

  return TotalStacked;
};
