module.exports = function (sequelize, DataTypes) {
    var GoogleAccount = sequelize.define('GoogleAccount', {
        google_id: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    });

    GoogleAccount.associate = function (models) {
        GoogleAccount.belongsTo(models.UserProfile, {
            foreignKey: 'user_profile_id'
        });
    };

    return GoogleAccount;
};