const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const userStock = sequelize.define("userStock", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "primary key",
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  // const options = {
  //   tableName: "user",
  //   comment: "",
  //   indexes: []
  // };

  return userStock;
};
