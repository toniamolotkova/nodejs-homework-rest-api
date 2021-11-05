const { Contact } = require('../model/contact')

const listContacts = async (_, res) => {
  const result = await Contact.find({})
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}
module.exports = listContacts
