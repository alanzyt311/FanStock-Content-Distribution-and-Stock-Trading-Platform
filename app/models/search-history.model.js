const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const searchHistory = sequelize.define("searchHistory", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "primary key",
    },
    content: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  });

  // const options = {
  //   tableName: "user",
  //   comment: "",
  //   indexes: []
  // };

  return searchHistory;
};
