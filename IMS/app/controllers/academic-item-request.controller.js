//academic-item-request.controller.js
const db = require("../models");
const AcaItemReq = db.academic_item_request;

const Op = db.Sequelize.Op;

// Create and Save a new request
exports.create = (req, res) => {
    // Validate request
    if (!req.body.academicId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Request
    const request = {
        academicId: req.body.academicId,
        item_no: req.body.item_no,
        quantity: req.body.quantity,
        reason: req.body.reason,
        status: req.body.status
    };

    // Save Item in the database
    AcaItemReq.create(request)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Request."
            });
        });
};

// Retrieve all Requests from the database
exports.findAll = (req, res) => {

    AcaItemReq.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving items."
            });
        });
};

// Update status of a request
exports.updateStatus = (req, res) => {
    const requestId = req.params.requestId;

    AcaItemReq.update(
        { status: req.body.status }, // the new status value from the request body
        { where: { requestId: requestId } } // the filter to identify the correct record
    )
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Request status was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Request with requestId=${requestId}. Maybe Request was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Request with requestId=" + requestId
        });
    });
};
async function addToUserInventory(requestId) {
    const request = await db.academic_item_request.findOne({ where: { requestId: requestId } });
    const { academicId, item_no, quantity } = request;
  
    // Check if the item already exists in the user's inventory
    const inventoryItem = await db.user_inventory.findOne({ where: { academicId: academicId, item_no: item_no } });
  
    if (inventoryItem) {
      // If item exists, update the quantity
      await db.user_inventory.update({ quantity: db.sequelize.literal(`quantity + ${quantity}`) }, { where: { academicId: academicId, item_no: item_no } });
    } else {
      // If item does not exist, create a new inventory item
      await db.user_inventory.create({ academicId: academicId, item_no: item_no, quantity: quantity });
    }
  }

// Find item details by item_no
exports.findItemDetails = (req, res) => {
    const item_no = req.params.item_no;
    db.items.findOne({ where: { item_no: item_no } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving item details with item number = " + item_no
            });
        });
};

exports.getItemDetails = (req, res) => {
    const item_no = req.params.item_no;
    Item.findOne({ where: { item_no } })
        .then(item => {
            if (item) {
                res.send(item);
            } else {
                res.status(404).send({
                    message: `Item with item_no=${item_no} not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving item with item_no=" + item_no
            });
        });
};


// Update a Request by the requestId in the request
exports.update = (req, res) => {
    const requestId = req.params.requestId;

    AcaItemReq.update(req.body.data, {
        where: { requestId: requestId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Request was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Request with requestId=${requestId}. Maybe Request was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Request with requestId=" + requestId
            });
        });
};

// Find a single Request with an requestId
exports.findOne = (req, res) => {
    const requestId = req.params.requestId;

    AcaItemReq.findByPk(requestId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Request with item number = " + requestId
            });
        });
};