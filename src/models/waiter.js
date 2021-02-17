module.exports = (sequelize, DataTypes) => {
  const Waiter = sequelize.define(
    'Waiter',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  Waiter.associate = function (models) {
    Waiter.hasMany(models.Table, {
      foreignKey: 'waiterId',
    });
  };
  return Waiter;
};
