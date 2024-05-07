const db = require("../models");
const AcademicItemReq = db.academicItemReq;

// Update status of an academic item request
exports.updateStatus = (req, res) => {
  const requestId = req.params.requestId;

  if (!requestId) {
    return res.status(400).send({ message: "Request ID is required." });
  }

  AcademicItemReq.findOne({ where: { id: requestId } })
    .then((academicItemReq) => {
      if (!academicItemReq) {
        return res.status(404).send({ message: "Request not found." });
      }

      const { status } = req.body;

      academicItemReq.update({ status })
        .then(() => {
          res.status(200).send({ message: "Status updated successfully." });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
