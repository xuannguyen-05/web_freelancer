const {createConversationService, } = require("../services/conversation.service")

const createConversation = async(req, res) => {
    try {
        const userId = req.user.userID

        const{orderId} = req.body
        
        const conversation = createConversationService(orderId, userId)
        
        res.status(201).json({
            message: "Conversation created",
            data: conversation
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}

module.exports = {createConversation}