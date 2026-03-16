const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const prisma = require("../config/prisma")
const AppError = require("../utils/AppError")

const registerService  = async(data) => {
    const {name, email, password} = data
    const existingUser = await prisma.users.findUnique({
        where: {email}
    })
    if (existingUser){
        throw new AppError("Email already exists", 409)
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.users.create({
        data: {
            name,
            email,
            password: hashedPassword
        },
        select: {
            userID: true,
            name: true,
            email: true,
        }
    })

     // gán role mặc định buyer
    await prisma.user_roles.create({
        data: {
            userID: user.userID,
            roleID: 1 // buyer
        }
    })

    return user
}

const loginService = async(data) => {
    const {email, password} = data

    const user = await prisma.users.findUnique({
        where: {email}
    })

    if (!user) {
        throw new AppError("Invalid email or password", 400)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new AppError("Invalid email or password", 400)
    }

    const token = jwt.sign(
        { userID: user.userID }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    return {
        userID: user.userID,
        name: user.name,
        email: user.email,
        token
    }
}

module.exports = {registerService, loginService}