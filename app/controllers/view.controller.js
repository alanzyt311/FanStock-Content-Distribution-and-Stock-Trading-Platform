const db = require("../models");
const View = db.view;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // // Validate request
  // if (!req.body.content) {
  //   res.status(400).send({
  //     message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a Tutorial
  const view = {
    userId: req.body.userId,
    postId: req.body.postId,
  };

  // Save Tutorial in the database
  View.create(view)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the View.",
      });
    });
};

// Retrieve all Views according to userId/postId from the database.
exports.findAll = (req, res) => {
  const userId = req.query.userId;
  const postId = req.query.postId;
  var condition;

  if (userId && postId) {
    condition = { userId: userId, postId: postId };
  } else if (userId && !postId) {
    condition = { userId: userId };
  } else if (!userId && postId) {
    condition = { postId: postId };
  }

  View.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Views.",
      });
    });
};

// Delete Views according to userId/postId in the request
exports.delete = (req, res) => {
  const userId = req.query.userId;
  const postId = req.query.postId;
  var condition;

  if (userId && postId) {
    condition = { userId: userId, postId: postId };
  } else if (userId && !postId) {
    condition = { userId: userId };
  } else if (!userId && postId) {
    condition = { postId: postId };
  }

  View.destroy({
    where: condition,
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "View was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete View. Maybe View was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete View",
      });
    });
};

// Delete all Views from the database.
exports.deleteAll = (req, res) => {
  View.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} View were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all View.",
      });
    });
};
