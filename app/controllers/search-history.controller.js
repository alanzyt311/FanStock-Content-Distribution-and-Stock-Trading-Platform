const db = require("../models");
const SearchHistory = db.searchHistory;
const Op = db.Sequelize.Op;

// Create and Save a new SearchHistory
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a SearchHistory
  const searchHistory = {
    content: req.body.content,
    userId: req.body.userId,
  };

  // Save SearchHistory in the database
  SearchHistory.create(searchHistory)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the SearchHistory.",
      });
    });
};

// Retrieve all SearchHistorys according to userId from the database.
exports.findAll = (req, res) => {
  const userId = req.query.userId;
  var condition = { userId: userId };

  SearchHistory.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SearchHistory.",
      });
    });
};

// Find a single SearchHistory with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  SearchHistory.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving SearchHistory with id=" + id,
      });
    });
};

// Delete a SearchHistory with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  SearchHistory.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "SearchHistory was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete SearchHistory with id=${id}. Maybe SearchHistory was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete SearchHistory with id=" + id,
      });
    });
};

// Delete all SearchHistorys from the database.
exports.deleteAll = (req, res) => {
  SearchHistory.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} SearchHistory were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all SearchHistory.",
      });
    });
};
