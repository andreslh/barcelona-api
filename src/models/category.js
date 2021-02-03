module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
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
  Category.associate = function (models) {
    Category.hasMany(models.Subcategory, {
      foreignKey: 'categoryId',
    });
  };
  return Category;
};
