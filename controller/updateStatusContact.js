const { Contact } = require('../model/contact')
const { NotFound, BadRequest } = require('http-errors')

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params
  if (!req.body) {
    throw new BadRequest('missing field favorite')
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  if (!result) {
    throw new NotFound('Not found')
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = updateStatusContact
