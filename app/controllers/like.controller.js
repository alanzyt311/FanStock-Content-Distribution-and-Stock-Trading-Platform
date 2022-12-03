const db = require("../models");
const Like = db.like;
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
    const like = {
        userId: req.body.userId,
        postId: req.body.postId,
    };

    // Save Tutorial in the database
    Like.create(like)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Like.",
            });
        });
};

// Retrieve all Likes according to userId/postId from the database.
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

    Like.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Likes.",
            });
        });
};

// Delete likes according to userId/postId in the request
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

    Like.destroy({
        where: condition,
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Like was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Like. Maybe Like was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Like",
            });
        });
};

// Delete all Likes from the database.
exports.deleteAll = (req, res) => {
    Like.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Like were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Like.",
            });
        });
};
