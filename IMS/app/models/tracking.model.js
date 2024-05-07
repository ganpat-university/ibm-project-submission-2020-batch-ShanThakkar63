module.exports = (sequelize, DataTypes) => {
    const Tracking = sequelize.define('tracking', {
      requestId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'requests', // replace 'requests' with your actual table name
          key: 'id',
        }
      },
      status: {
        type: DataTypes.STRING
      }
      // Add other fields as required
    });
  
    return Tracking;
  };
  