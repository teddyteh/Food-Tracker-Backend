module.exports = function (sequelize, DataTypes) {
  const User = sequelize.import(__dirname + "/User")
  const Food = sequelize.import(__dirname + "/Food")

  return sequelize.define('Entry', {
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
    food: {
      type: DataTypes.UUID,

      references: {
        model: Food,

        key: 'id'
      }
    },
    serving: DataTypes.FLOAT
  });
};