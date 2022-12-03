const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const user = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "primary key",
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    // need a hash to protect pwd???
    userPassword: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "password",
    },
    phone: {
      type: DataTypes.CHAR(11),
      allowNull: true,
      defaultValue: null,
      validate: { isNumeric: true },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      validate: { isEmail: true },
    },
    birthday: {
      type: DataTypes.DATEONLY(),
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "unknown"),
      allowNull: false,
      defaultValue: "unknown",
    },
    avatar: {
      type: DataTypes.BLOB,
      allowNull: true,
      // defaultValue: ...
    },
    likeBusiness: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    likeEntertainment: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    likePolitics: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    likeSport: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    likeTech: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    balance: {
      type: DataTypes.DECIMAL(8, 3),
      allowNull: false,
      defaultValue: 0.0,
      validate: { min: 0 },
    },
    createdIp: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: { isIP: true },
    },
  });

  // const options = {
  //   tableName: "user",
  //   comment: "",
  //   indexes: []
  // };

  return user;
};
