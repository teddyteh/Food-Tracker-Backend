module.exports = function (sequelize, DataTypes) {
  const User = sequelize.import(__dirname + "/User");
  const Nutrient = sequelize.import(__dirname + "/Nutrient");

  var Food = sequelize.define('Food', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    user: {
      type: DataTypes.UUID,

      references: {
        model: User,

        key: 'id'
      }
    }
  });

  Food.hasMany(Nutrient, { as: 'nutrients'});

  return Food;

};