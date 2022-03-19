module.exports = (sequelize, Sequelize) => {
  const Stacking = sequelize.define("stacking", {
    tokenAddress: {
      type: Sequelize.STRING,
    },
    userAddress: {
      type: Sequelize.STRING,
    },
    package: {
      type: Sequelize.STRING,
    },
    totalAmount: {
      type: Sequelize.FLOAT,
    },
    apy: {
      type: Sequelize.STRING,
    },
    stackDate: {
      type: Sequelize.STRING,
    },
    lockedDay: {
      type: Sequelize.STRING,
    },
    endDate: {
      type: Sequelize.STRING,
    },
    estimatedInterest: {
      type: Sequelize.STRING,
    },
    rawData: {
      type: Sequelize.TEXT,
    },
  });

  return Stacking;
};
