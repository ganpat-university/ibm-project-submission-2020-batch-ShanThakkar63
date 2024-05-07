const controller = require("../controllers/academic-item-request.controller");

module.exports = function (app) {
    // Create a new request
    app.post("/api/item/ac/req/create", controller.create);

    // Retrieve a single Item with requestId
    app.get("/api/item/ac/req/get/:requestId", controller.findOne);

    // Retrieve all Items
    app.get("/api/item/ac/req/getall", controller.findAll);

    // Update a request with requestId
    app.put("/api/item/ac/req/update/:requestId", controller.update);

   // Update the status of a request
    // academic-item-req.routes.js
    app.put("/api/item/ac/req/updateStatus/:requestId", controller.updateStatus);

    // Retrieve item details with item_no
    app.get("/api/item/ac/req/getItemDetails/:item_no", controller.findItemDetails);


    
        



};