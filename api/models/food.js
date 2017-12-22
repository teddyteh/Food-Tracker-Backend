module.exports = function (sequelize, DataTypes) {
    var Food = sequelize.define('Food', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING
    });

    Food.associate = function (models) {
        Food.belongsTo(models.UserProfile, {
            foreignKey: 'created_by'
        });
        Food.belongsToMany(models.Nutrient, {
            through: 'FoodNutrient',
            foreignKey: 'food'
        });
    };

    return Food;
};