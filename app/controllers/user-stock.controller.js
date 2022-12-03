const db = require("../models");
const UserStock = db.userStock;
const Op = db.Sequelize.Op;

// Create and Save a new UserStock
exports.create = (req, res) => {
  // // Validate request
  // if (!req.body.name) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create a UserStock
  const userStock = {
    amount: req.body.amount,
    userId: req.body.userId,
    stockId: req.body.stockId,
  };

  // Save UserStock in the database
  UserStock.create(userStock)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the UserStock.",
      });
    });
};

// Retrieve all UserStocks according to userId/stockID from the database.
exports.findAll = (req, res) => {
  const userId = req.query.userId;
  const stockId = req.query.stockId;
  var condition;

  if (userId && stockId) {
    condition = { userId: userId, stockId: stockId };
  } else if (userId && !stockId) {
    condition = { userId: userId };
  } else if (!userId && stockId) {
    condition = { stockId: stockId };
  }

  UserStock.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving UserStocks.",
      });
    });
};

// Find a single UserStock with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  UserStock.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving UserStock with id=" + id,
      });
    });
};

// Update a UserStock by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  UserStock.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "UserStock was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update UserStock with id=${id}. Maybe UserStock was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating UserStock with id=" + id,
      });
    });
};

// Delete a UserStock with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  UserStock.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "UserStock was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete UserStock with id=${id}. Maybe UserStock was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete UserStock with id=" + id,
      });
    });
};

// Delete all UserStocks from the database.
exports.deleteAll = (req, res) => {
  UserStock.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} UserStock were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all UserStock.",
      });
    });
};
