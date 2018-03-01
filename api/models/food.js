module.exports = function (sequelize, DataTypes) {
    var Food = sequelize.define('Food', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        local_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        calories: DataTypes.FLOAT
    });

    Food.associate = function (models) {
        Food.belongsTo(models.UserProfile, {
            foreignKey: 'created_by'
        });
        Food.belongsToMany(models.Nutrient, {
            through: 'FoodNutrient',
            foreignKey: 'food'
        });
        Food.belongsToMany(models.ServingSize, {
            through: 'FoodServingSize',
            foreignKey: 'food'
        });
    };

    return Food;
};