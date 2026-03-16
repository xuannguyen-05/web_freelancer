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

const updatePackageService = async(packageId, userId, data) => {
    const pkg = await prisma.gig_packages.findUnique({
        where: {packageID: packageId},
        include: {
            gigs: true
        }
    })

    if (!pkg){
        throw new AppError("Package Not Found", 404)
    }

     // check quyền
    if (pkg.gigs.freelancerID !== userId) {
        throw new AppError("Forbidden", 403)
    }

    const updated = await prisma.gig_packages.update({
        where: {packageID: packageId},
        data
    })

    return updated
}

const deletePackageService = async(packageId, userId) => {
    const pkg = await prisma.gig_packages.findUnique({
        where: {packageID: packageId},
        include: {
            gigs: true
        }
    })

    if (!pkg){
        throw new AppError("Package Not Found", 404)
    }

     // check quyền
    if (pkg.gigs.freelancerID !== userId) {
        throw new AppError("Forbidden", 403)
    }

    // đếm số package của gig
    const count = await prisma.gig_packages.count({
        where: { gigID: pkg.gigID }
    })

    // nếu chỉ còn 1 package → không cho xóa
    if (count <= 1) {
        throw new AppError("Gig must have at least 1 package", 400)
    }

    const deleted = await prisma.gig_packages.delete({
        where: {packageID: packageId},
    })

    return deleted
}

module.exports = { createPackageService, getPackagesByGigIdService, updatePackageService, deletePackageService }