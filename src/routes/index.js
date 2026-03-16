const express = require("express")
const router = express.Router()

const auth = require("./auth.routes")
const user = require("./user.routes")
const freelancer = require("./freelancer.routes")
const gig = require("./gig.routes")
const package = require("./package.routes")
// const order = require("./order.routes")
// const category = require("./category.routes")
// const skill = require("./skill.routes")
// const conversation = require("./conversation.routes")


router.use("/auth", auth)
router.use("/users", user)
router.use("/freelancers", freelancer)
router.use("/gigs", gig)
router.use("/packages", package)
// router.use("/orders", order)
// router.use("/categories", category)
// router.use("/skills", skill)
// router.use("/conversations", conversation)

module.exports = router

