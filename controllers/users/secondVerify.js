const { BadRequest } = require('http-errors')
const { sendMail } = require('../../helpers')
const { User } = require('../../models')

const secondVerify = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw new BadRequest('missing required field email')
  }
  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }
  const { verificationToken } = user
  const mail = {
    to: email,
    subject: 'Confirmation of registration',
    text: `<a href='http://localhost:3000/api/users/verify/${verificationToken}''> Click here to confirm your email</a>`
  }
  await sendMail(mail)
  res.status(200).json({
    message: 'Verification email sent'
  })
}

module.exports = secondVerify
