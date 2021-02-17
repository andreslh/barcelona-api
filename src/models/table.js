module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define(
    'Table',
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
      total: {
        type: DataTypes.NUMBER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      waiterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Waiter',
          key: 'id',
          as: 'waiterId',
        },
      },
    },
    {}
  );
  Table.associate = function (models) {
    Table.hasMany(models.Tableproduct, {
      foreignKey: 'tableId',
    });
    Table.belongsTo(models.Waiter, {
      foreignKey: 'waiterId',
      onDelete: 'CASCADE',
    });
  };
  return Table;
};
