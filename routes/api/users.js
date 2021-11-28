const express = require('express')
const router = express.Router()
const { validation, controllerWrapper, authenticate, upload } = require('../../middlewares')
const { users: ctrl } = require('../../controllers')
const { joiSchema } = require('../../models/user')

router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup))
router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login))
router.get('/logout', authenticate, controllerWrapper(ctrl.logout))
router.get('/current', authenticate, controllerWrapper(ctrl.currentUser))
router.patch('/avatars', authenticate, upload.single('avatar'), controllerWrapper(ctrl.updateAvatar))

module.exports = router
