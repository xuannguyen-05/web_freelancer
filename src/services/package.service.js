const prisma = require("../config/prisma")
const AppError = require("../utils/AppError")

const createPackageService = async (gigId, userId, data) => {

    const gig = await prisma.gigs.findUnique({
        where: { gigID: gigId }
    })

    if (!gig) {
        throw new AppError("Gig Not Found", 404)
    }

    if (gig.freelancerID !== userId) {
        throw new AppError("Forbidden", 403)
    }

    const count = await prisma.gig_packages.count({
        where: { gigID: gigId }
    })

    if (count >= 3) {
        throw new AppError("Maximum 3 packages allowed", 400)
    }

    const pkg = await prisma.gig_packages.create({
        data: {
            title: data.title,
            description: data.description,
            price: data.price,
            deliveryDay: data.deliveryDay,
            revision: data.revision,
            gigID: gigId
        }
    })

    return pkg
}

const getPackagesByGigIdService = async(gigId) => {
    const gig = await prisma.gigs.findUnique({
        where: { gigID: gigId }
    })

    if (!gig) {
        throw new AppError("Gig not found", 404)
    }

    const packages = await prisma.gig_packages.findMany({
        where: {gigID: gigId}
    })
    
    return packages
}

module.exports = { createPackageService, getPackagesByGigIdService }