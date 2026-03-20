const prisma = require("../config/prisma")
const AppError = require("../utils/AppError")
const {ORDER_STATUS} =  require("../constants/orderStatus")

const createReviewService = async(orderId, userId, rating, comment) => {
    const order = await prisma.orders.findUnique({
        where: {orderID: orderId}
    })

    if(!order){
        throw new AppError("Order Not Found", 404)
    }

    if(order.buyerID !== userId){
        throw new AppError("Forbidden", 403)
    }

    if(order.status !== ORDER_STATUS.COMPLETED){
        throw new AppError("Order must be COMPLETED", 400)
    }

    const existing = await prisma.reviews.findFirst({
        where: {

            orderID: orderId,
            reviewerID: userId
        }
    })

    if (existing) {
        throw new AppError("You already reviewed this order", 400)
    }

    const review = await prisma.reviews.create({
        data: {
            orderID: orderId,
            reviewerID: userId,
            revieweeID: order.freelancerID,
            rating,
            comment
        },
        include: {
            reviewer: {
                select: {
                    userID: true,
                    name: true,
                    avatar: true
                }
            }
        }
    })

    return review
}

const getReviewsByFreelancerService = async(freelancerId) => {
    const reviews = await prisma.reviews.findMany({
        where: {revieweeID: freelancerId},
        include: {
            reviewer: {
                select: {
                    userID: true,
                    name: true,
                    avatar: true
                }
            }
        },
        orderBy: {
            created_at: "desc"
        }
    })

    return reviews
}

module.exports = {createReviewService, getReviewsByFreelancerService}