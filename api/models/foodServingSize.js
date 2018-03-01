module.exports = function (sequelize, DataTypes) {
    var FoodServingSize = sequelize.define('FoodServingSize', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
    });

    return FoodServingSize;
};