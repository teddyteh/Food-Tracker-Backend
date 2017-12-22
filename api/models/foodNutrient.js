module.exports = function (sequelize, DataTypes) {
    var FoodNutrient = sequelize.define('FoodNutrient', {
        amount: DataTypes.FLOAT
    });

    return FoodNutrient;
};