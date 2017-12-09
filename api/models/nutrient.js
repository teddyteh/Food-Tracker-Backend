module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Nutrient', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    amount: DataTypes.FLOAT
  });
};