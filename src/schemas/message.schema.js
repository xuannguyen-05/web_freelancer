const Joi = require("joi")

const sendMessageSchema = Joi.object({
    content: Joi.string().min(1).required()
})

module.exports = { sendMessageSchema }