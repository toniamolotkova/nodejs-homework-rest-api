const express = require('express')
const router = express.Router()
const { validation, controllerWrapper } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')
const { joiSchema } = require('../../models/user')

router.post('/users/signup', validation(joiSchema), controllerWrapper(ctrl.signup))
router.post('/users/login', validation(joiSchema), controllerWrapper(ctrl.login))

module.exports = router
