module.exports = (sequelize, Sequelize) => {
  const TotalStacked = sequelize.define("totalStacked", {
    totalTokens: {
      type: Sequelize.FLOAT,
    },
  });

  return TotalStacked;
};
