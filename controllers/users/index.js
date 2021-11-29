const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const currentUser = require('./currentUser')
const updateAvatar = require('./updateAvatar')
const verify = require('./verify')
const secondVerify = require('./secondVerify')

module.exports = {
  signup,
  login,
  logout,
  currentUser,
  updateAvatar,
  verify,
  secondVerify
}
