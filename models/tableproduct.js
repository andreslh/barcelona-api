'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tableproduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tableproduct.init({
    productId: DataTypes.INTEGER,
    tableId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.NUMBER,
    total: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Tableproduct',
  });
  return Tableproduct;
};