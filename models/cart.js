'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Product, {foreignKey: 'productId'})
      Cart.belongsTo(models.User, {foreignKey: 'userId'})
    }
  };
  Cart.init({
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        isMinus(value) {
          if(value < 0) {
            throw new Error ('Quantity cannot be below zero')
          }
        }
      }
    },
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cart',
    hooks: {
      beforeCreate(cart) {
        // console.log(cart)
        cart.status = false
      }
    }
  });
  return Cart;
};