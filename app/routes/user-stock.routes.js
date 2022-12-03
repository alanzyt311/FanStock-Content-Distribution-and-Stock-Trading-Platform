module.exports = (app) => {
  const userStock = require("../controllers/user-stock.controller.js");

  var router = require("express").Router();

  // Create a new post
  router.post("/", userStock.create);

  // Retrieve all userStock
  router.get("/", userStock.findAll);

  // Retrieve a single post with id
  router.get("/:id", userStock.findOne);

  // Update a post with id
  router.put("/:id", userStock.update);

  // Delete a post with id
  router.delete("/:id", userStock.delete);

  // Delete all userStock
  router.delete("/", userStock.deleteAll);

  app.use("/api/userStock", router);
};
