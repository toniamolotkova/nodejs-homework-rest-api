const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')
const { randomUUID } = require('crypto')
const { User } = require('../../models')

const userPath = path.join(__dirname, '../../public/avatars')

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user
  const file = await Jimp.read(req.file.path)
  await file.resize(250, 250).write(req.file.path)
  const { path: tempUpload, originalname } = req.file

  try {
    const filename = `${_id}_${randomUUID()}_${originalname}`
    const resultUpload = path.join(userPath, filename)
    await fs.rename(tempUpload, resultUpload)
    const avatarURL = path.join('/avatars', filename)
    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true })
    res.status(200).json({
      avatarURL: avatarURL,
    })
  } catch (error) {
    fs.unlink(tempUpload)
    next(error)
  }
}

module.exports = updateAvatar
