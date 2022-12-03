module.exports = (app) => {
  const searchHistory = require("../controllers/search-history.controller.js");

  var router = require("express").Router();

  // Create a new post
  router.post("/", searchHistory.create);

  // Retrieve all searchHistory
  router.get("/", searchHistory.findAll);

  // Retrieve with id
  router.get("/:id", searchHistory.findOne);

  // Delete a post with id
  router.delete("/", searchHistory.delete);

  // Delete all searchHistory
  router.delete("/", searchHistory.deleteAll);

  app.use("/api/searchHistory", router);
};
