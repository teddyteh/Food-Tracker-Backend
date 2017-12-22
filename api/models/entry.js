module.exports = function (sequelize, DataTypes) {
    var Entry = sequelize.define('Entry', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        serving: DataTypes.FLOAT
    });

    Entry.associate = function (models) {
        Entry.belongsTo(models.UserProfile, {
            foreignKey: 'user'
        });
        Entry.belongsTo(models.Food, {
            foreignKey: 'food'
        });
    };

    return Entry;
};