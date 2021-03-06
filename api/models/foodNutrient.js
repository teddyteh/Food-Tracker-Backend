module.exports = function (sequelize, DataTypes) {
    var FoodNutrient = sequelize.define('FoodNutrient', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        amount: DataTypes.FLOAT,
    });

    return FoodNutrient;
};