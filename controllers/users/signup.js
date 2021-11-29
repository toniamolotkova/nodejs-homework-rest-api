const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { User } = require('../../models')
const { v4 } = require('uuid')
const { sendMail } = require('../../helpers')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const verificationToken = v4()
  const avatarURL = gravatar.url(email)
  const newUser = new User({ email, avatarURL, verificationToken })
  newUser.setPassword(password)
  await newUser.save()
  const { subscription } = newUser
  const mail = {
    to: email,
    subject: 'Confirmation of registration',
    text: `<a href='http://localhost:3000/api/users/verify/${verificationToken}''> Click here to confirm your email</a>`
  }
  await sendMail(mail)
  res.status(201).json({
    user: {
      email: email,
      subscription: subscription,
    }
  })
}

module.exports = signup
