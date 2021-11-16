const { User } = require('../../models')

const currentUser = async (req, res) => {
  const { _id, email, subscription } = req.user
  await User.findById(_id)
  res.status(200).json({
    email: email,
    subscription: subscription,
  })
}

module.exports = currentUser
