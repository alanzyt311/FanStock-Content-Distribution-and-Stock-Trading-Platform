module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/", users.create);

  // Retrieve all users with given string in name
  router.get("/", users.findAll);

  // Retrieve a single user with name
  router.get("/:username", users.findOne);

  // Update a user with id/name
  router.put("/:id", users.updateById);
  router.put("/:username", users.updateByName);

  // Delete a user with name
  router.delete("/:username", users.delete);

  // Delete all users
  router.delete("/", users.deleteAll);

  app.use("/api/user", router);
};
