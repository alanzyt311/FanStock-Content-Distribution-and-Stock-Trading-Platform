const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const view = sequelize.define("view", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "primary key",
    },
  });

  // const options = {
  //   tableName: "user",
  //   comment: "",
  //   indexes: []
  // };

  return view;
};
