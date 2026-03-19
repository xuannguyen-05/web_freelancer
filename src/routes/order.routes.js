const express = require("express");

const {
    createOrder,
    getMyOrders,
    getFreelancerOrders,
    getOrderById,
    startOrder,
    deliverOrder,
    completeOrder,
    cancelOrder
} = require("../controllers/order.controller");

const { authMiddleware } = require("../middlewares/auth.middleware");
const { roleMiddleware } = require("../middlewares/role.middleware");
const { createOrderSchema } = require("../schemas/order.schema")
const { validate } = require("../middlewares/validate.middleware")

const router = express.Router();


router.post("/", authMiddleware, roleMiddleware(["buyer"]), validate(createOrderSchema), createOrder)

router.get("/my", authMiddleware, roleMiddleware(["buyer"]), getMyOrders)

router.get("/freelancer", authMiddleware, roleMiddleware(["freelancer"]), getFreelancerOrders)

router.get("/:id", authMiddleware, getOrderById)

router.patch("/:id/start", authMiddleware, roleMiddleware(["freelancer"]), startOrder)
router.patch("/:id/deliver", authMiddleware, roleMiddleware(["freelancer"]), deliverOrder)

router.patch("/:id/complete", authMiddleware, roleMiddleware(["buyer"]), completeOrder)
router.patch("/:id/cancel", authMiddleware, roleMiddleware(["buyer"]), cancelOrder)


module.exports = router




// api
// POST   /orders
// GET    /orders/my
// GET    /orders/freelancer
// GET    /orders/:id
// PATCH  /orders/:id/status
// PATCH  /orders/:id/cancel