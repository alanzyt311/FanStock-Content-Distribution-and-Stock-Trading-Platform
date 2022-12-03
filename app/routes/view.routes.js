module.exports = (app) => {
  const view = require("../controllers/view.controller.js");

  var router = require("express").Router();

  // Create a new post
  router.post("/", view.create);

  // Retrieve all view
  router.get("/", view.findAll);

  // Delete a post with id
  router.delete("/", view.delete);

  // Delete all view
  router.delete("/", view.deleteAll);

  app.use("/api/view", router);
};
