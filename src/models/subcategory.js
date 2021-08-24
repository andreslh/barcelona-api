module.exports = (sequelize, DataTypes) => {
  const Subcategory = sequelize.define(
    'Subcategory',
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
      allowHalf: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Category',
          key: 'id',
          as: 'categoryId',
        },
      },
    },
    {}
  );
  Subcategory.associate = function (models) {
    Subcategory.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
    });
    Subcategory.hasMany(models.Product, {
      foreignKey: 'subcategoryId',
    });
  };
  return Subcategory;
};
