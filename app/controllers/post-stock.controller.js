const db = require("../models");
const PostStock = db.postStock;
const Op = db.Sequelize.Op;

// Create and Save a new PostStock
exports.create = (req, res) => {
  // // Validate request
  // if (!req.body.name) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create a PostStock
  const postStock = {
    amount: req.body.amount,
    postId: req.body.postId,
    stockId: req.body.stockId,
  };

  // Save PostStock in the database
  PostStock.create(postStock)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PostStock.",
      });
    });
};

// Retrieve all PostStocks according to PostId/stockID from the database.
exports.findAll = (req, res) => {
  const postId = req.query.postId;
  const stockId = req.query.stockId;
  var condition;

  if (postId && stockId) {
    condition = { postId: postId, stockId: stockId };
  } else if (postId && !stockId) {
    condition = { postId: postId };
  } else if (!postId && stockId) {
    condition = { stockId: stockId };
  }

  PostStock.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving PostStocks.",
      });
    });
};

// Find a single PostStock with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PostStock.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving PostStock with id=" + id,
      });
    });
};

// Update a PostStock by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  PostStock.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PostStock was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update PostStock with id=${id}. Maybe PostStock was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating PostStock with id=" + id,
      });
    });
};

// Delete a PostStock with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  PostStock.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PostStock was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete PostStock with id=${id}. Maybe PostStock was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete PostStock with id=" + id,
      });
    });
};

// Delete all PostStocks from the database.
exports.deleteAll = (req, res) => {
  PostStock.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} PostStock were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all PostStock.",
      });
    });
};
