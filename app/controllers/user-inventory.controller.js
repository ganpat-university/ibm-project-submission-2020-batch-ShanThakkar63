// user-inventory.controller.js
const db = require('../models');

exports.getUserInventory = async (req, res) => {
  const academicId = req.params.academicId;

  try {
    const inventory = await db.user_inventory.findAll({ where: { academicId } });
    res.json(inventory);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching user inventory' });
  }
};