const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "username can not be empty!",
    });
    return;
  }

  // Create a User
  const user = {
    username: req.body.username,
    userPassword: req.body.userPassword,
    phone: req.body.phone,
    email: req.body.email,
    birthday: req.body.birthday,
    gender: req.body.gender,
    avatar: req.body.avatar,
    likeBusiness: req.body.likeBusiness,
    likeEntertainment: req.body.likeEntertainment,
    likePolitics: req.body.likePolitics,
    likeSport: req.body.likeSport,
    likeTech: req.body.likeTech,
    balance: req.body.balance,
    createdIp: req.body.createdIp,
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users with given string in username from the database
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username
    ? { username: { [Op.like]: `%${username}%` } }
    : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single user with an user name
exports.findOne = (req, res) => {
  const username = req.params.username;

  User.findOne(username)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with name=" + username,
      });
    });
};

// Update a User by the id in the request
exports.updateById = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with username=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with username=" + id,
      });
    });
};

// Update a User by the name in the request
exports.updateByName = (req, res) => {
  const username = req.params.username;
  // res.send({ message: `${username}` });

  User.update(req.body, {
    where: { username: username },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with username=${username}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with username=" + username,
      });
    });
};

// Delete a User with the specified name in the request
exports.delete = (req, res) => {
  const username = req.params.username;

  User.destroy({
    where: { username: username },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with name=${username}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with name=" + username,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} User were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all User.",
      });
    });
};
