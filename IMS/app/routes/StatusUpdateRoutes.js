// server/routes/StatusUpdateRoutes.js

const express = require('express');
const router = express.Router();
const StatusUpdateController = require('../controllers/StatusUpdateController'); // Adjust the path based on your project structure

router.put('/academic-item-req/updateStatus/:requestId', StatusUpdateController.updateStatus);

module.exports = router;


