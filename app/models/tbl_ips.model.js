module.exports = (sequelize, Sequelize) => {
  const totalStacked = sequelize.define("totalStacked", {
    totalTokens: {
      type: Sequelize.FLOAT,
    },
  });

  return totalStacked;
};
