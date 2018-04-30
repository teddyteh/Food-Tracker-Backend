module.exports = function (sequelize, DataTypes) {
    var Nutrient = sequelize.define('Nutrient', {
        name: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    });

    Nutrient.associate = function (models) {
        Nutrient.belongsToMany(models.Food, {
            through: 'FoodNutrient',
            foreignKey: 'nutrient'
        });
    };

    return Nutrient;
};