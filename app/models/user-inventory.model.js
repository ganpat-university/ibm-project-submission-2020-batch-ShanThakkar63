// user-inventory.model.js
module.exports = (sequelize, Sequelize) => {
    const UserInventory = sequelize.define("user_inventory", {
      academicId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      item_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  
    return UserInventory;
  };