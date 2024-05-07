module.exports = (sequelize, DataTypes) => {
    const Tracking = sequelize.define('tracking', {
      requestId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING,
      },
      // Add other fields like timestamps if needed
    });
  
    return Tracking;
  };
  