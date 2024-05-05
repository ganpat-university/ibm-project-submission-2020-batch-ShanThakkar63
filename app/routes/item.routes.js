const controller = require("../controllers/item.controller");

module.exports = function (app) {
    // Create a new Item
    app.post("/api/item/create", controller.create);

    // Retrieve all Items
    app.get("/api/item/getall", controller.findAll);

    // Retrieve all published Items
    // app.get("/api/item/available", controller.findAllAvailable);

    // Retrieve a single Item with item_no
    app.get("/api/item/:item_no", controller.findOne);

    // Update a Item with item_no
    app.put("/api/item/update/:item_no", controller.update);

    // Delete a Item with item_no
    app.delete("/api/item/remove/:item_no", controller.delete);

    // Delete all Items
    app.delete("/api/item/removeall", controller.deleteAll);

    app.get("/api/items/:item_no", controller.getItemDetails);

    app.get('/api/item/total', controller.totalItems);

    app.get('/api/item/outOfStock', controller.outOfStockItems);

    // In your routes file, e.g., item.routes.js
    app.get('/items/delivered/:userId', controller.getDeliveredItemsForUser);

};