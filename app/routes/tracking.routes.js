module.exports = app => {
  const tracking = require('../controllers/tracking.controller.js');

  var router = require('express').Router();

  // Update tracking info
  router.post('/tracking', tracking.update);

  // Retrieve tracking info
  router.get('/tracking/:requestId', tracking.find);

  app.use('/api', router);
};
