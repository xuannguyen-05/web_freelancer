const {getGigsService, 
        getGigByIdService, 
        createGigService, 
        updateGigService,
        deleteGigService} = require("../services/gig.service")
const formatGig = require("../utils/formatGig")

const getGigs = async (req, res) => {
   try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const categoryID = req.query.categoryID
    const search = req.query.search

    const gigs = await getGigsService(page, limit, categoryID, search)

    res.status(200).json({
        message: "Get gigs successfully",
        data: {
            page: result.page,
            limit: result.limit,
            total: result.total,
            data: result.data.map(formatGig)
        }
    })

   } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
   }
}

const getGigById = async (req, res) => {
    try {
        const gigId = +req.params.id

        if (Number.isNaN(gigId)) {
            return res.status(400).json({
                message: "Invalid Gig ID"
            })
        }

        const gig = await getGigByIdService(gigId)

        res.status(200).json({
            message: "Get gig detail successfully",
            data: formatGig(gig)
        })

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

        res.status(201).json({
            message: "Gig created successfully",
            data: formatGig(gig)
        })

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

        if (Number.isNaN(gigId)) {
            return res.status(400).json({
                message: "Invalid Gig ID"
            })
        }

        if (req.file) {
            req.body.img_url = "/uploads/" + req.file.filename
        }

        const gig = await updateGigService(gigId, userId, req.body)

        res.status(200).json({
            message: "Gig updated successfully",
            data: formatGig(gig)
        })
        
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

        if (Number.isNaN(gigId)) {
            return res.status(400).json({
                message: "Invalid Gig ID"
            })
        }

        const gig = await deleteGigService(gigId, userId)

        res.status(200).json({
            message: "Gig deleted successfully",
            data: null
        })
        
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}

module.exports = {getGigs, getGigById, createGig, updateGig, deleteGig}