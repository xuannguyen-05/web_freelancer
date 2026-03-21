const {createConversationService, getConversationByOrderIdService} = require("../services/conversation.service")
const formatConversation = require("../utils/formatConversation")

const createConversation = async(req, res) => {
    try {
        const userId = req.user.userID

        const {orderId} = req.body
        
        const conversation = await createConversationService(orderId, userId)
        
        res.status(201).json({
            message: "Conversation created",
            data: formatConversation(conversation)
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}

const getConversationByOrderId = async(req, res) => {
    try {
        const userId = req.user.userID

        const orderId = +req.params.orderId

        if (Number.isNaN(orderId)) {
            return res.status(400).json({
                message: "Invalid Order ID"
            })
        }
        
        const conversations = await getConversationByOrderIdService(orderId, userId)
        
        res.status(200).json({
            message: "Conversations retrieved",
            data: conversations.map(formatConversation)
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}

module.exports = {createConversation, getConversationByOrderId}