const express = require("express")
const router = express.Router()

const auth = require("./auth.routes")
const user = require("./user.routes")
const freelancer = require("./freelancer.routes")
const gig = require("./gig.routes")
const package = require("./package.routes")
const order = require("./order.routes")
const review = require("./review.routes")
const conversation = require("./conversation.routes")
// const category = require("./category.routes")
// const skill = require("./skill.routes")



router.use("/auth", auth)
router.use("/users", user)
router.use("/freelancers", freelancer)
router.use("/gigs", gig)
router.use("/packages", package)
router.use("/orders", order)
router.use("/reviews", review)
router.use("/conversations", conversation)
// router.use("/categories", category)
// router.use("/skills", skill)

module.exports = router

