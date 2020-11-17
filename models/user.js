'use strict';
const {
  Model
} = require('sequelize');

const { hashPass } = require('../helpers/bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {foreignKey: 'userId'})
      User.hasMany(models.Cart, {foreignKey: 'userId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please use email format'
        },
        notNull: {
          args: true,
          msg: 'Email is required'
        },
        notEmpty: {
          args: true,
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password is required'
        },
        notEmpty: {
          args: true,
          msg: 'Password is required'
        },
        isMinim(value) {
          if(value.length < 4) {
            throw new Error ('Password too short')
          }
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        // console.log(user)
        user.password = hashPass(user.password)
        if(!user.role || user.role === '') {
          user.role = 'customer'
        }
      }
    }
  });
  return User;
};