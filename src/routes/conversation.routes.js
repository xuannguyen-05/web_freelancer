const express = require("express")
const { authMiddleware } = require("../middlewares/auth.middleware")

const { createConversation, getConversationByOrderId } = require("../controllers/conversation.controller")
const { sendMessage, getMessagesByConversation } = require("../controllers/message.controller")

const router = express.Router()

// Conversation
router.post("/", authMiddleware, createConversation)
router.get("/:orderId", authMiddleware, getConversationByOrderId)

// Nested messages
router.post("/:conversationId/messages", authMiddleware, sendMessage)
router.get("/:conversationId/messages", authMiddleware, getMessagesByConversation)

module.exports = router