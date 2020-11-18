const router = require('express').Router()
const Controller = require('../controllers/productController')
const authorization = require('../middlewares/authorization')


router.get('/', authorization, Controller.productList)

router.post('/', authorization, Controller.productAdd)

router.get('/:id', authorization, Controller.productId)

router.put('/:id', authorization, Controller.productPut)

router.delete('/:id', authorization, Controller.delete)

module.exports = router