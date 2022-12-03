const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const like = sequelize.define("like", {
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

  return like;
};
