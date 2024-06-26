const db = require("../models");
const IssuedAcaItem = db.issued_aca_item_request;

const Op = db.Sequelize.Op;

// Create and Save a new request
exports.create = (req, res) => {
    // Validate request
    if (!req.body.requestId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Request
    const request = {
        requestId: req.body.requestId,
        nonacademicId: req.body.nonacademicId,
        returnBefore: req.body.returnBefore
    };

    // Save Item in the database
    IssuedAcaItem.create(request)
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

    IssuedAcaItem.findAll()
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

// Retrieve count of delivered items
exports.countDeliveredItems = (req, res) => {
    IssuedAcaItem.count({
        where: { status: 'Delivered' }
    }).then(count => {
        res.send({ deliveredItems: count });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while counting delivered items."
        });
    });
};
