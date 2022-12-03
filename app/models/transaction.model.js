const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const transaction = sequelize.define("transaction", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "primary key",
    },
    operation: {
      type: DataTypes.ENUM("buy", "sell"),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 },
    },
  });

  // const options = {
  //   tableName: "user",
  //   comment: "",
  //   indexes: []
  // };

  return transaction;
};
