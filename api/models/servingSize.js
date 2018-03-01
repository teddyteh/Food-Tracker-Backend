module.exports = function (sequelize, DataTypes) {
    var Serving = sequelize.define('ServingSize', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
        amount: DataTypes.FLOAT
    });

    return Serving;
};