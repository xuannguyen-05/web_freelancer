const formatConversation = (conversation) => ({
    conversationID: conversation.conversationID,
    orderID: conversation.orderID,
    participants: conversation.conversation_participants.map(p => ({
        id: p.userID,
        name: p.users?.name,
        avatar: p.users?.avatar
    })),
    messages: conversation.messages.map(m => ({
        id: m.messageID,
        content: m.content,
        senderID: m.senderID,
        createdAt: m.created_at
    }))
})

module.exports = formatConversation