const express = require("express");
const {getMe, updateMe, getUserById} = require("../controllers/user.controller")
const { authMiddleware } = require("../middlewares/auth.middleware.js")
const {updateUserSchema} = require("../schemas/user.schema.js")
const {validate} = require("../middlewares/validate.middleware")
const upload = require("../middlewares/upload.middleware");

const router = express.Router();


router.get("/me", authMiddleware, getMe)
router.patch("/me", authMiddleware, upload.single("avatar"), validate(updateUserSchema), updateMe)

router.get("/:id", getUserById)

module.exports = router
