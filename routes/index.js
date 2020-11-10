const router = require('express').Router()
const productRouter = require('./productRouter')
const UserController = require('../controllers/userController.js')
const authentication = require('../middlewares/authentication')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
// router.post('/googleLogin', UserController.googleLogin)

router.use(authentication)

router.use('/products', productRouter)

module.exports = router