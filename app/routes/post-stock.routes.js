module.exports = (app) => {
  const postStock = require("../controllers/post-stock.controller.js");

  var router = require("express").Router();

  // Create a new post
  router.post("/", postStock.create);

  // Retrieve all postStock
  router.get("/", postStock.findAll);

  // Retrieve a single post with id
  router.get("/:id", postStock.findOne);

  // Update a post with id
  router.put("/:id", postStock.update);

  // Delete a post with id
  router.delete("/:id", postStock.delete);

  // Delete all postStock
  router.delete("/", postStock.deleteAll);

  app.use("/api/postStock", router);
};
