const { User, Product, Cart } = require('../models/index')

async function authorization(req, res, next) {
    const userId = req.loggedInUser.id
    const id = +req.params.id
    try {
        const dataCart = await Cart.findByPk(id)
        if(!dataCart) {
            throw { name: 'Not Found'}
        } else if(dataCart.userId === userId ) {
            next()
        } else {
            throw { name: 'Not authorized' }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authorization



module.exports = authorization