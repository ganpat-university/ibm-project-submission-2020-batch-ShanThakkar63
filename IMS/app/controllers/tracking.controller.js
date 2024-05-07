const db = require('../models');
const Tracking = db.tracking; // Use the right model reference here

// Update tracking status
exports.update = (req, res) => {
  const { requestId, status } = req.body;

  Tracking.update({ status: status }, {
    where: { requestId: requestId }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Tracking was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Tracking with id=${requestId}. Maybe Tracking was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Tracking with id=" + requestId
    });
  });
};

// Retrieve tracking info by requestId
exports.find = (req, res) => {
  const requestId = req.params.requestId;

  Tracking.findByPk(requestId)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tracking with id=${requestId}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tracking with id=" + requestId
      });
    });
};
