const express = require('express')
const router = express.Router()
const { contacts: ctrl } = require('../../controllers')
const { validation, controllerWrapper } = require('../../middlewares')
const { joiSchema } = require('../../models/contact')

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContact))

router.put('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateContactById))

router.patch('/:contactId/favorite', controllerWrapper(ctrl.updateStatusContact))

module.exports = router
