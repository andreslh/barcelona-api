module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    'Token',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return Token;
};
