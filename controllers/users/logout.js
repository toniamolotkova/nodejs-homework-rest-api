const { User } = require('../../models')

const logout = async (req, res) => {
  console.log(req.user)
  const { _id } = req.user

  await User.findByIdAndUpdate(_id, { token: null })
  res.status(204).json()
}

module.exports = logout
