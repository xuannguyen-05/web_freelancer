const prisma = require("../config/prisma")
const AppError = require("../utils/AppError")

const createConversationService  = async(orderId, userId) => {
    const order = await prisma.orders.findUnique({
        where: {orderID: orderId}
    })

    if(!order){
        throw new AppError("Order Not Found", 404)
    }

    let conversation = await prisma.conversations.findFirst({
        where: {orderID: orderId}
    })

    if(!conversation){
        conversation = await prisma.conversations.create({
            data: { 
                orderID: orderId
            }
        })

        await prisma.conversation_participants.createMany({
            data: [
                {conversationID: conversation.conversationID, userID: order.buyerID},
                {conversationID: conversation.conversationID, userID: order.freelancerID}
            ]
        })
    }

    return conversation
}

const getConversationByOrderIdService = async(orderId, userId) => {
    const conversation = await prisma.conversations.findUnique({
        where: {orderID: orderId},
        include: {
            conversation_participants: true,
            messages: true
        }
    })

    if(!conversation){
        throw new AppError("Conversation Not Found", 404)
    }

    const participantIds = conversation.conversation_participants.map(p => p.userID)
    if(!participantIds.includes(userId)){
        throw new AppError("Forbidden", 403)
    }

    return conversation
}

module.exports = {createConversationService, getConversationByOrderIdService}