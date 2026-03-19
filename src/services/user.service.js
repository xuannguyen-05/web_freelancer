const prisma = require("../config/prisma")
const AppError = require("../utils/AppError")

const getMeService = async(userId) => {
    const me = await prisma.users.findUnique({
        where: {userID: userId},
        select: {
            userID: true,
            name: true,
            email: true,
            avatar: true,
            bio: true
        }
    })

    return me
}

const updateMeService = async(userID, data) => {
    const existingUser = await prisma.users.findUnique({
        where: { userID }
    })

    if (!existingUser) {
        throw new AppError("User not found", 404)
    }
    
    const me = await prisma.users.update({
        where: {userID: userID},
        data: data,
        select: {
            userID: true,
            name: true,
            email: true,
            avatar: true,    
            bio: true
        }
    })

    return me
}

const getUserByIdService = async(id) => {
    const user = await prisma.users.findUnique({
        where: {userID: id},
        select: {
            userID: true,
            name: true,
            avatar: true,
            bio: true
        }
    })

    if(!user){
        throw new AppError("User Not Found", 404)
    }

    return user
}


module.exports = {getMeService, updateMeService, getUserByIdService}