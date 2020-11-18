
async function authorization(req, res, next) {
    const role = req.loggedInUser.role
    try {
        if(role !== 'customer') {
            throw { name: 'Not authorized' }
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
}



module.exports = authorization