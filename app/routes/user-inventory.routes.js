// user-inventory.routes.js
const userInventoryController = require('../controllers/user-inventory.controller');

module.exports = (app) => {
  app.get('/api/user-inventory/:academicId', userInventoryController.getUserInventory);
};