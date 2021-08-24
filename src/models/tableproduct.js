module.exports = (sequelize, DataTypes) => {
  const Tableproduct = sequelize.define(
    'Tableproduct',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Product',
          key: 'id',
          as: 'productId',
        },
      },
      tableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Table',
          key: 'id',
          as: 'tableId',
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      price: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      total: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
    },
    {}
  );
  Tableproduct.associate = function (models) {
    Tableproduct.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
    });
    Tableproduct.belongsTo(models.Table, {
      foreignKey: 'tableId',
      onDelete: 'CASCADE',
    });
  };
  return Tableproduct;
};
