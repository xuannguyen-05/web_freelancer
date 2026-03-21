const prisma = require("../config/prisma")
const AppError = require("../utils/AppError")

const sendMessageService  = async(conversationId, senderId, content) => {
    const conversation = await prisma.conversations.findUnique({
        where: {conversationID: conversationId},
        include: {
            conversation_participants: {
                select: {
                    userID: true
                }
            }
        }
    })

    if(!conversation){
        throw new AppError("Conversation Not Found", 404)
    }

    const participantIds = conversation.conversation_participants.map(p => p.userID)
    if(!participantIds.includes(senderId)){
        throw new AppError("Forbidden", 403)
    }

    const message = await prisma.messages.create({
        data: {
            conversationID: conversationId,
            senderID: senderId,
            content
        },
        include: {
            users: {
                select: {
                    userID: true,
                    name: true,
                    avatar: true
                }
            }
        }
    })

    // update last activity
    await prisma.conversations.update({
        where: { conversationID: conversationId },
        data: { updated_at: new Date() }
    })

    return message
}

const getMessagesByConversationService  = async(conversationId, userId) => {
    const conversation = await prisma.conversations.findUnique({
        where: {conversationID: conversationId},
        include: {
            conversation_participants: {
                select: {
                    userID: true
                }
            },
            messages: {
                orderBy: {created_at: "asc"},
                include: {
                    users: {
                        select: {
                            userID: true,
                            name: true,
                            avatar: true
                        }
                    }
                }
            }
        }
    })

    if(!conversation){
        throw new AppError("Conversation Not Found", 404)
    }

    const participantIds = conversation.conversation_participants.map(p => p.userID)
    if(!participantIds.includes(userId)){
        throw new AppError("Forbidden", 403)
    }

    return conversation.messages
}

module.exports = {sendMessageService, getMessagesByConversationService}