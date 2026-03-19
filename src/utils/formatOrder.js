const { ORDER_STATUS_LABEL } = require("../constants/orderStatus")

const formatOrder = (order) => {
    if (!order) return null

    return {
        orderID: order.orderID,
        buyerID: order.buyerID,
        freelancerID: order.freelancerID,
        gigID: order.gigID,
        packageID: order.packageID,

        price: Number(order.price),
        serviceFee: Number(order.serviceFee),
        totalAmount: Number(order.totalAmount),

        status: order.status,
        statusText: ORDER_STATUS_LABEL[order.status],

        created_at: order.created_at,
        delivered_at: order.delivered_at,
        updated_at: order.updated_at,

        freelancer: order.freelancer,
        gigs: order.gigs,
        gig_packages: order.gig_packages
        ? {
          ...order.gig_packages,
          price: Number(order.gig_packages.price)
        }
      : null
    }
}

module.exports = formatOrder