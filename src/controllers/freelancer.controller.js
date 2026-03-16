const {createFreelancerService, 
        getFreelancerByIdService, 
        getMyFreelancerService, 
        updateMyFreelancerService} = require("../services/freelancer.service")

const createFreelancer = async(req, res) => {
    try {
        const userId = req.user.userID
        const freelancer = await  createFreelancerService(userId, req.body)
        res.status(201).json(freelancer)
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}

const getFreelancerById = async(req, res) => {
    try {
        const id = +req.params.id

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid Freelancer ID"
            })
        }

        const freelancer = await getFreelancerByIdService(id)

        res.status(200).json(freelancer) 

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}

const getMyFreelancer = async(req, res) => {
    try {
        const UserId = req.user.userID

        const me = await getMyFreelancerService(UserId)

        res.status(200).json(me) 

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}


const updateMyFreelancer = async(req, res) => {
    try {
        const UserId = req.user.userID

        const me = await updateMyFreelancerService(UserId, req.body)

        res.status(200).json(me) 

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}



module.exports = {createFreelancer, getFreelancerById, getMyFreelancer, updateMyFreelancer}