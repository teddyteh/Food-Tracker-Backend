module.exports = function (sequelize, DataTypes) {
    var LocalAccount = sequelize.define('LocalAccount', {
        username: {type: DataTypes.STRING, primaryKey: true},
        password: DataTypes.STRING,
        password_salt: DataTypes.STRING,
        password_algorithm: DataTypes.STRING,
    });

    LocalAccount.associate = function (models) {
        LocalAccount.belongsTo(models.UserProfile, {
            foreignKey: 'user_profile_id'
        });
    };

    return LocalAccount;
};