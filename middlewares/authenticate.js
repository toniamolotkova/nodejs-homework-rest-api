const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')
const { SECRET_KEY } = process.env

const authenticate = async (req, _, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized')
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY)
      const user = await User.findById(id)
      if (!user || !user.token) {
        throw new Unauthorized('Not authorized')
      }
      req.user = user
      next()
    } catch (error) {
      throw new Unauthorized(error.message)
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate
