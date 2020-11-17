const router = require('express').Router()
const Controller = require('../controllers/productController')
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')


router.get('/', Controller.productList)

router.use(authentication)

router.post('/', authorization, Controller.productAdd)

router.get('/:id', authorization, Controller.productId)

router.put('/:id', authorization, Controller.productPut)

router.delete('/:id', authorization, Controller.delete)

module.exports = router