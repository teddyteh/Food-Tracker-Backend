module.exports = function (sequelize, DataTypes) {
  const User = sequelize.import(__dirname + "/User")

  return sequelize.define('Weight', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user: {
      type: DataTypes.UUID,

      references: {
        model: User,

        key: 'id'
      }
    },
    weight: {
      type: DataTypes.FLOAT
    }
  });
};