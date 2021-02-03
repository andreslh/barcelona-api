module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
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
      price: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      subcategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Subcategory',
          key: 'id',
          as: 'subcategoryId',
        },
      },
    },
    {}
  );
  Product.associate = function (models) {
    Product.belongsTo(models.Subcategory, {
      foreignKey: 'subcategoryId',
      onDelete: 'CASCADE',
    });
    Product.hasMany(models.Tableproduct, {
      foreignKey: 'productId',
    });
  };
  return Product;
};
