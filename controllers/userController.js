const { User } = require('../models/index')
const { comparePass } = require('../helpers/bcryptjs')
const { signToken } = require('../helpers/jwt')

class UserController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({where: {email: email}})

            if(!email && !password ) {
                throw { name: 'Invalid Input'}
            } else {
                if(!user) {
                    throw { name: 'Invalid Input'}
                } else if(!comparePass(password, user.password)) {
                    throw { name: 'Invalid Input'}
                } else {
                    const access_token = signToken({
                        id: user.id,
                        email: user.email
                    })
                    // console.log(access_token)
                    res.status(200).json({access_token})
                }
            }
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController