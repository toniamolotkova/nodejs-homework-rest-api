const nodemailer = require('nodemailer')
require('dotenv').config()

const { META_PASSWORD } = process.env

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'elisston@meta.ua',
    pass: META_PASSWORD,
  }
}
const transporter = nodemailer.createTransport(nodemailerConfig)

const sendMail = async (data) => {
  const email = { ...data, from: 'elisston@meta.ua' }
  await transporter.sendMail(email)
  console.log(email)
  return true
}

module.exports = sendMail
