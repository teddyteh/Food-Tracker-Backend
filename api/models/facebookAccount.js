module.exports = function (sequelize, DataTypes) {
    var FacebookAccount = sequelize.define('FacebookAccount', {
        facebook_id: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    });

    FacebookAccount.associate = function (models) {
        FacebookAccount.belongsTo(models.UserProfile, {
            foreignKey: 'user_profile_id'
        });
    };

    return FacebookAccount;
};