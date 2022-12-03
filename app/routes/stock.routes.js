module.exports = (app) => {
    const stocks = require("../controllers/stock.controller.js");

    var router = require("express").Router();

    // Create a new post
    router.post("/", stocks.create);

    // Retrieve all stocks
    router.get("/", stocks.findAll);

    // Retrieve a single post with id
    router.get("/:id", stocks.findOne);

    // Update a post with id
    router.put("/:id", stocks.update);

    // Delete a post with id
    router.delete("/:id", stocks.delete);

    // Delete all stocks
    router.delete("/", stocks.deleteAll);

    app.use("/api/stock", router);
};
