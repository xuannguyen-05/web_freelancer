const {createPackageService, 
        getPackagesByGigIdService, 
        updatePackageService, 
        deletePackageService} = require("../services/package.service")

const createPackage = async(req, res) => {
    try {
        const userId = req.user.userID

        const gigId = +req.params.id

        const pkg = await createPackageService(gigId, userId, req.body)

        res.status(201).json(pkg)
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}

const getPackagesByGigId = async(req, res) => {
    try {
        const gigId = +req.params.id

        const packages  = await getPackagesByGigIdService(gigId)

        res.status(200).json(packages )
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}

const updatePackage = async(req, res) => {
    try {
        const packageId = +req.params.id
        const userId = req.user.userID

        const pkg = await updatePackageService(packageId, userId, req.body)

        res.status(200).json(pkg)

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}

const deletePackage = async(req, res) => {
    try {
        const packageId = +req.params.id
        const userId = req.user.userID

        const pkg = await deletePackageService(packageId, userId)

        res.status(200).json(pkg)

    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message
        })
    }
}


module.exports = {createPackage, getPackagesByGigId, updatePackage, deletePackage}