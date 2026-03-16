const {getMeService, updateMeService, getUserByIdService} = require("../services/user.service")


const getMe = async(req, res) => {
    try {
        const UserId = req.user.userID

        const me = await getMeService(UserId)

        res.status(200).json(me) 

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}


const updateMe = async(req, res) => {
    try {
        const UserId = req.user.userID

        const me = await updateMeService(UserId, req.body)

        res.status(200).json(me) 

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}

const getUserById = async(req, res) => {
    try {
        const id = +req.params.id

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid User ID"
            })
        }

        const user = await getUserByIdService(id)

        res.status(200).json(user) 

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}

module.exports = {getMe, updateMe, getUserById}
