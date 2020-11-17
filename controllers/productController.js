const { User, Product } = require('../models/index')

class ProductController {
    static async productAdd(req, res, next) {
        try {
            const inputProduct = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock,
                userId: req.loggedInUser.id
            }
            const newProduct = await Product.create(inputProduct)

            res.status(201).json(newProduct)
        } catch (err) {
            next(err)
        }
    }
    static async productList(req, res, next) {
        try {
            const productList = await Product.findAll({order: [['id', 'ASC']], include: [User]})
            res.status(200).json({productList})

        } catch (error) {
            next(error)
        }
    }
    static async productId(req, res, next) {
        try {
            const id = +req.params.id
            const productId = await Product.findByPk(id)

            if(productId) {
                res.status(200).json(productId)
            } else {
                throw { name: 'Not Found'}
            }

        } catch (error) {
            next(error)
        }
    }
    static async productPut(req, res, next) {
        try {
            const id = +req.params.id
            const dataProduct = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock,
            }

            const updateProduct = await Product.update(dataProduct, {where: {id: id}, returning: true} )

            if(updateProduct[1][0]) {
                res.status(200).json(updateProduct[1][0])
            } else {
                throw { name: 'Not Found'}
            }

        } catch (error) {
            next(error)
        }
    }
    static async delete(req, res, next) {
        try {
            const id = +req.params.id

            const deleteProduct = await Product.destroy( {where: {id: id}} )

            if(deleteProduct) {
                res.status(200).json({ message: 'Product success to delete' })
            } else {
                throw { name: 'Not Found'}
            }

        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController