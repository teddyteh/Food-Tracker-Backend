module.exports = function (sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    password_salt: DataTypes.STRING,
    password_algorithm: DataTypes.STRING,
    height: DataTypes.FLOAT,
    last_login: DataTypes.DATE
  });
};