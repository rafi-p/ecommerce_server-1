'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {foreignKey: 'userId'})
      Product.hasMany(models.Cart, {foreignKey: 'productId'})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name is required'
        },
        notEmpty: {
          args: true,
          msg: 'Name is required'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Image_url is required'
        },
        notEmpty: {
          args: true,
          msg: 'Image_url is required'
        }
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Price is required'
        },
        notEmpty: {
          args: true,
          msg: 'Price is required'
        },
        isNumeric: {
          args: true,
          msg: 'Price must be a number'
        },
        isMinus(value) {
          if(value < 0) {
            throw new Error ('Price cannot be below zero')
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Stock is required'
        },
        notEmpty: {
          args: true,
          msg: 'Stock is required'
        },
        isNumeric: {
          args: true,
          msg: 'Stock must be a number'
        },
        isMinus(value) {
          if(value < 0) {
            throw new Error ('Stock cannot be below zero')
          }
        }
      }
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};