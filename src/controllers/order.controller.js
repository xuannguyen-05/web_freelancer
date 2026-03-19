const {createOrderService, 
        getMyOrdersService, 
        getFreelancerOrdersService, 
        getOrderByIdService, 
        startOrderService,
        deliverOrderService,
        completeOrderService,
        cancelOrderService
        } = require("../services/order.service")
const formatOrder = require("../utils/formatOrder")

const createOrder = async(req, res) => {
    try {
        const userId = req.user.userID

        const { packageID } = req.body

        const order = await createOrderService(packageID, userId)

        res.status(201).json({
            message: "Order created successfully",
            data: formatOrder(order)
        })

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
   }
}

const getMyOrders = async(req, res) => {
    try {
        const userId = req.user.userID

        const orders = await getMyOrdersService(userId)

        res.status(200).json({
            message: "Get my orders successfully",
            data: orders.map(formatOrder)
        })

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
   }
}

const getFreelancerOrders = async(req, res) => {
    try {
        const userId = req.user.userID

        const orders = await getFreelancerOrdersService(userId)

        res.status(200).json({
            message: "Get freelancer orders successfully",
            data: orders.map(formatOrder)
        })

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
   }
}

const getOrderById = async(req, res) => {
    try {
        const userId = req.user.userID

        const orderId = +req.params.id

        if (Number.isNaN(orderId)) {
            return res.status(400).json({
                message: "Invalid Order ID"
            })
        }

        const order = await getOrderByIdService(orderId, userId)

        res.status(200).json({
            message: "Get order successfully",
            data: formatOrder(order)
        })

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
   }
}

const startOrder = async(req, res) => {
    try {
        const userId = req.user.userID

        const orderId = +req.params.id

        if (Number.isNaN(orderId)) {
            return res.status(400).json({
                message: "Invalid Order ID"
            })
        }

        const order = await startOrderService(orderId, userId)

        res.status(200).json({
            message: "Start order successfully",
            data: formatOrder(order)
        })

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}

const deliverOrder = async(req, res) => {
    try {
        const userId = req.user.userID

        const orderId = +req.params.id

        if (Number.isNaN(orderId)) {
            return res.status(400).json({
                message: "Invalid Order ID"
            })
        }

        const order = await deliverOrderService(orderId, userId)

        res.status(200).json({
            message: "Deliver order successfully",
            data: formatOrder(order)
        })

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}

const completeOrder = async(req, res) => {
    try {
        const userId = req.user.userID

        const orderId = +req.params.id

        if (Number.isNaN(orderId)) {
            return res.status(400).json({
                message: "Invalid Order ID"
            })
        }

        const order = await completeOrderService(orderId, userId)

        res.status(200).json({
            message: "Complete order successfully",
            data: formatOrder(order)
        })

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}

const cancelOrder = async(req, res) => {
    try {
        const userId = req.user.userID

        const orderId = +req.params.id

        if (Number.isNaN(orderId)) {
            return res.status(400).json({
                message: "Invalid Order ID"
            })
        }

        const order = await cancelOrderService(orderId, userId)

        res.status(200).json({
            message: "Cancel order successfully",
            data: formatOrder(order)
        })

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}


module.exports = {createOrder, 
                getMyOrders, 
                getFreelancerOrders, 
                getOrderById, 
                startOrder,
                deliverOrder,
                completeOrder,
                cancelOrder
                }
