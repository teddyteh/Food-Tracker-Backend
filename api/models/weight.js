module.exports = function (sequelize, DataTypes) {
    var Weight = sequelize.define('Weight', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        weight: {
            type: DataTypes.FLOAT
        }
    });

    return Weight;
};