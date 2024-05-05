// define academic request table
module.exports = (sequelize, Sequelize) => {
    const Academic_Item_Request = sequelize.define(
        "academic_item_requests",
        {
            requestId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            academicId: {
                type: Sequelize.STRING
            },
            item_no: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            reason: {
                type: Sequelize.STRING(1000)
            },
            isIssued: {
                type: Sequelize.BOOLEAN,
                defaultValue: false // Default value set to false (0)
            },
            status:{
                type: Sequelize.STRING
            }
        },
        {
            timestamps: true,
            createdAt: 'requestedTime',
            updatedAt: false
        }
    );

    return Academic_Item_Request;
};
