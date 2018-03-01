module.exports = function (sequelize, DataTypes) {
    var Entry = sequelize.define('Entry', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity: DataTypes.FLOAT
    });

    Entry.associate = function (models) {
        Entry.belongsTo(models.UserProfile, {
            foreignKey: 'user'
        });
        Entry.belongsTo(models.Food, {
            foreignKey: 'food'
        });
        Entry.belongsTo(models.ServingSize, {
            foreignKey: 'serving_size'
        });
    };

    return Entry;
};