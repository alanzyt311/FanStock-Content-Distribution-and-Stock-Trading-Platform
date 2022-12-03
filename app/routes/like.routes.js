module.exports = (app) => {
  const like = require("../controllers/like.controller.js");

  var router = require("express").Router();

  // Create a new post
  router.post("/", like.create);

  // Retrieve all like
  router.get("/", like.findAll);

  // Delete a post with id
  router.delete("/", like.delete);

  // Delete all like
  router.delete("/", like.deleteAll);

  app.use("/api/like", router);
};
