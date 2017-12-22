module.exports = function (sequelize, DataTypes) {
    var UserProfile = sequelize.define('UserProfile', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        picture: DataTypes.STRING,
        height: DataTypes.FLOAT,
        last_login: DataTypes.DATE
    });

    UserProfile.associate = function (models) {
        UserProfile.hasMany(models.Weight, {
            as: 'Weights'
        });
    };

    return UserProfile;
};