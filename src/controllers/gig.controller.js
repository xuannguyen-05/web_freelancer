const {getGigsService, 
        getGigByIdService, 
        createGigService, 
        updateGigService,
        deleteGigService} = require("../services/gig.service")

const getGigs = async (req, res) => {
   try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const categoryID = req.query.categoryID
    const search = req.query.search

    const gigs = await getGigsService(page, limit, categoryID, search)

    res.status(200).json(gigs)
   } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
   }
}

const getGigById = async (req, res) => {
    try {
        const id = +req.params.id

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid Gig ID"
            })
        }

        const gig = await getGigByIdService(id)

        res.status(200).json(gig)

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}

const createGig = async (req, res) => {
    try {
        const userId = req.user.userID

        if (req.file) {
            req.body.img_url = "/uploads/" + req.file.filename
        }

        const gig = await createGigService(userId, req.body)

        res.status(201).json(gig)

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}

const updateGig = async(req, res) => {
    try {
        const userId = req.user.userID

        const gigId = +req.params.id

        if (req.file) {
            req.body.img_url = "/uploads/" + req.file.filename
        }

        const gig = await updateGigService(gigId, userId, req.body)

        res.status(200).json(gig)
        
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}

const deleteGig = async(req, res) => {
    try {
        const userId = req.user.userID

        const gigId = +req.params.id

        const gig = await deleteGigService(gigId, userId)

        res.status(200).json(gig)
        
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}

module.exports = {getGigs, getGigById, createGig, updateGig, deleteGig}