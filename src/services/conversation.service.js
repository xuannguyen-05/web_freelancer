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

module.exports = {createConversationService}