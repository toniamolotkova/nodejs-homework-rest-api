const express = require('express')
const router = express.Router()
const { contacts: ctrl } = require('../../controllers')
const { validation, authenticate, controllerWrapper } = require('../../middlewares')
const { joiSchema } = require('../../models/contact')

router.get('/', authenticate, controllerWrapper(ctrl.listContacts))

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getContactById))

router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', authenticate, controllerWrapper(ctrl.removeContact))

router.put('/:contactId', authenticate, validation(joiSchema), controllerWrapper(ctrl.updateContactById))

router.patch('/:contactId/favorite', authenticate, controllerWrapper(ctrl.updateStatusContact))

module.exports = router
