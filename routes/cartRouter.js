const router = require('express').Router()
const Controller = require('../controllers/cartController')
const authorization = require('../middlewares/authorizationUser')


router.get('/', Controller.cartList)
router.post('/:id', Controller.cartAdd)
router.delete('/:id', authorization, Controller.cartRemove)
router.put('/:id', authorization, Controller.cartUpdate)
router.put('/', Controller.cartCheckout)

module.exports = router