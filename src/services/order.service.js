const prisma = require("../config/prisma")
const AppError = require("../utils/AppError")
const {ORDER_STATUS} =  require("../constants/orderStatus")

const SERVICE_FEE_PERCENT = 0.1

const createOrderService = async(packageId, userId) => {
    const pkg = await prisma.gig_packages.findUnique({
        where: {packageID: packageId}
    })

    if(!pkg){
        throw new AppError("Package Not Found", 404)
    }

    const gig = await prisma.gigs.findUnique({
        where: {gigID: pkg.gigID}
    })

    if(!gig){
        throw new AppError("Gig Not Found", 404)
    }

    const buyerID = userId
    const freelancerID = gig.freelancerID

    if(buyerID === freelancerID){
        throw new AppError("Unable to buy your own service", 400)
    }

    const price = Number(pkg.price)
    const serviceFee = Number((price * SERVICE_FEE_PERCENT).toFixed(2))
    const totalAmount = Number((price + serviceFee).toFixed(2))

    const order = await prisma.orders.create({
        data: {
            buyerID,
            freelancerID,
            gigID: gig.gigID,
            packageID: pkg.packageID,
            price: price,
            serviceFee,
            totalAmount,
            status: ORDER_STATUS.PENDING
        }
    })

    return order
}

const getMyOrdersService = async(userId) => {
    const orders = await prisma.orders.findMany({
        where: {buyerID: userId},
        include: {
            freelancer: {
                select: {
                    userID: true,
                    name: true, 
                    avatar: true
                }
            },
            gigs: {
                select: {
                    gigID: true,
                    title: true,
                    img_url: true
                }
            },
            gig_packages: {
                select: {
                    packageID: true,
                    price: true,
                    deliveryDay: true
                }
            }
        },
        orderBy: {
            created_at: "desc"
        }
    })

    return orders
}

const getFreelancerOrdersService = async(userId) => {
    const orders = await prisma.orders.findMany({
        where: {freelancerID: userId},
        include: {
            buyer: {
                select: {
                    userID: true,
                    name: true, 
                    avatar: true
                }
            },
            gigs: {
                select: {
                    gigID: true,
                    title: true,
                    img_url: true
                }
            },
            gig_packages: {
                select: {
                    packageID: true,
                    price: true,
                    deliveryDay: true
                }
            }
        },
        orderBy: {
            created_at: "desc"
        }
    })

    return orders
}

const getOrderByIdService = async(orderId, userId) => {
    const order = await prisma.orders.findUnique({
        where: {orderID: orderId},
        include: {
            buyer: {
                select: {
                    userID: true,
                    name: true, 
                    avatar: true
                }
            },
            freelancer: {
                select: {
                    userID: true,
                    name: true, 
                    avatar: true
                }
            },
            gigs: {
                select: {
                    gigID: true,
                    title: true,
                    img_url: true
                }
            },
            gig_packages: {
                select: {
                    packageID: true,
                    price: true,
                    deliveryDay: true
                }
            }
        }
    })

    if(!order) {
        throw new AppError("Order Not Found", 404);
    }

    if(
        order.buyerID !== userId &&
        order.freelancerID !== userId
    ){
        throw new AppError("Forbidden", 403);
    }
    
    return order
}

const startOrderService = async(orderId, userId) => {
    const order = await prisma.orders.findUnique({
        where: {orderID: orderId}
    })

    if(!order){
        throw new AppError("Order Not Found", 404)
    }

    if(order.freelancerID !== userId){
         throw new AppError("Forbidden", 403)
    }
    
    if(order.status !== ORDER_STATUS.PENDING){
        throw new AppError("Order must be PENDING", 400)
    }

    const updated = await prisma.orders.update({
        where: {orderID: orderId},
        data: {
            status: ORDER_STATUS.IN_PROGRESS
        }
    })

    return updated
}


const deliverOrderService = async(orderId, userId) => {
    const order = await prisma.orders.findUnique({
        where: {orderID: orderId}
    })

    if(!order){
        throw new AppError("Order Not Found", 404)
    }

    if(order.freelancerID !== userId){
         throw new AppError("Forbidden", 403)
    }
    
    if(order.status !== ORDER_STATUS.IN_PROGRESS){
        throw new AppError("Order must be IN_PROGRESS", 400)
    }

    const updated = await prisma.orders.update({
        where: {orderID: orderId},
        data: {
            status: ORDER_STATUS.DELIVERED,
            delivered_at: new Date()
        }
    })

    return updated
}

const completeOrderService = async(orderId, userId) => {
    const order = await prisma.orders.findUnique({
        where: {orderID: orderId}
    })

    if(!order){
        throw new AppError("Order Not Found", 404)
    }

    if(order.buyerID !== userId){
         throw new AppError("Forbidden", 403)
    }
    
    if(order.status !== ORDER_STATUS.DELIVERED){
        throw new AppError("Order must be DELIVERED", 400)
    }

    const updated = await prisma.orders.update({
        where: {orderID: orderId},
        data: {
            status: ORDER_STATUS.COMPLETED
        }
    })

    return updated
}

const cancelOrderService = async(orderId, userId) => {
    const order = await prisma.orders.findUnique({
        where: {orderID: orderId}
    })

    if(!order){
        throw new AppError("Order Not Found", 404)
    }

    if(order.buyerID !== userId && order.freelancerID !== userId){
        throw new AppError("Forbidden", 403)
    }
    
    if(
        order.status !== ORDER_STATUS.PENDING &&
        order.status !== ORDER_STATUS.IN_PROGRESS
    ){
        throw new AppError("Cannot cancel this order", 400)
    }

    const updated = await prisma.orders.update({
        where: {orderID: orderId},
        data: {
            status: ORDER_STATUS.CANCELLED
        }
    })

    return updated
}


module.exports = {createOrderService, 
                getMyOrdersService, 
                getFreelancerOrdersService, 
                getOrderByIdService, 
                startOrderService,
                deliverOrderService,
                completeOrderService,
                cancelOrderService
                }