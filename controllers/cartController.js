const e = require('express')
const { User, Product, Cart } = require('../models/index')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize

class CartController {
    static async cartAdd(req, res, next) {
        try {
            let productId = +req.params.id
            let isAdded = false


            const product = await Product.findOne({where:{id: productId}})

            const user = await User.findOne({where:{id: req.loggedInUser.id}, include:[Cart]})


            if(product) {
                user.Carts.forEach(el => {
                    if(el.productId === product.id) {
                        isAdded = true
                    }
                })
                if(isAdded === false && product.stock > 0) {
                    const productCart = {
                        productId: product.id,
                        userId: req.loggedInUser.id,
                        quantity: 1
                    }
                    const newCart = await Cart.create(productCart)
                    res.status(201).json(newCart)
                } else if(isAdded === true ) {
                    const userCart = await Cart.findOne({where:{userId: req.loggedInUser.id, productId: product.id}, include:[Product, User]})
                    if(userCart.quantity < product.stock) {
                        const updateQuantity = {
                            quantity: userCart.quantity + 1
                        }
                        const updateCart = await Cart.update(updateQuantity, {where: {id: userCart.id}, returning: true} )
                        res.status(200).json(updateCart[1][0])
                    } else {
                        throw { name: 'Max stock reached'}
                    }
                }
            } else {
                throw { name: 'Not Found'}
            }
        } catch (err) {
            next(err)
        }
    }
    static async cartList(req, res, next) {
        try {
            const cartList = await Cart.findAll({order: [['id', 'DESC']], where:{userId: req.loggedInUser.id}, include:[Product]})
            res.status(200).json({cartList})

        } catch (error) {
            next(error)
        }
    }
    static async cartRemove(req, res, next) {
        try {
            const id = +req.params.id

            const deleteCart = await Cart.destroy( {where: {id: id}} )

            if(deleteCart) {
                res.status(200).json({ message: 'Cart product  success to delete' })
            } else {
                throw { name: 'Not Found'}
            }

        } catch (error) {
            next(error)
        }
    }
    static async cartUpdate(req, res, next) {
        try {
            let id = +req.params.id
            const userCart = await Cart.findOne({where:{id: id}, include:[Product, User]})
            console.log(id)
            if(userCart) {
                if(req.body.quantity <= userCart.Product.stock) {
                    const updateQuantity = {
                        quantity: req.body.quantity
                    }
                    const updateCart = await Cart.update(updateQuantity, {where: {id: userCart.id}, returning: true} )
                    res.status(200).json(updateCart[1][0])
                } else {
                    throw { name: 'Max stock reached'}
                }
            } else {
                throw { name: 'Not Found'}
            }
        } catch (error) {
            next(error)
        }
    }
    static async cartCheckout(req, res, next) {
        try {
            const cartList = await Cart.findAll({order: [['id', 'DESC']], userId: req.loggedInUser.id, include:[Product]})

            const product = cartList.map(el => {
                console.log(`${el.Product.stock} - ${el.quantity}`, el.id)
                el.Product.stock = el.Product.stock - el.quantity
                return el.Product
            })

            product.forEach(el => {
                console.log(el)
                queryInterface.bulkUpdate('Products', {stock: el.stock}, {id: el.id})
            })
            queryInterface.bulkDelete('Carts')
            res.status(200).json({ message: 'Checkout success' })


        } catch (error) {
            next(error)
        }
    }
}


module.exports = CartController