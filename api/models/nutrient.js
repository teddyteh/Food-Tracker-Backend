module.exports = function (sequelize, DataTypes) {
    var Nutrient = sequelize.define('Nutrient', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING
    });

    Nutrient.associate = function (models) {
        Nutrient.belongsToMany(models.Food, {
            through: 'FoodNutrient',
            foreignKey: 'nutrient'
        });
    };

    return Nutrient;
};