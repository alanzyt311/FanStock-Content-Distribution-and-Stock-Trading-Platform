const db = require("../models");
const Stock = db.stock;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.stockName) {
    res.status(400).send({
      message: "Stock name can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const stock = {
    stockName: req.body.stockName,
    description: req.body.description,
    price: req.body.price,
    availableAmount: req.body.availableAmount,
    publishedAmount: req.body.publishedAmount,
  };

  // Save Tutorial in the database
  Stock.create(stock)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Stock.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const stockName = req.query.stockName;
  var condition = stockName
    ? { stockName: { [Op.like]: `%${stockName}%` } }
    : null;

  Stock.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Stocks.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Stock.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Stock with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Stock.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Stock was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Stock with id=${id}. Maybe Stock was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Stock with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Stock.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Stock was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Stock with id=${id}. Maybe Stock was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Stock with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Stock.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Stock were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Stock.",
      });
    });
};
