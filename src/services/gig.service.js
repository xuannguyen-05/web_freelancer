const prisma = require("../config/prisma")
const AppError = require("../utils/AppError")

const getGigsService = async (page, limit, categoryID, search) => {

    const skip = (page - 1) * limit

    const where = {}

    if (categoryID && !Number.isNaN(Number(categoryID))) {
        where.categoryID = Number(categoryID)
    }

    if (search) {
        where.title = {
            contains: search,
            mode: "insensitive"
        }
    }

    const [gigs, total] = await Promise.all([
        prisma.gigs.findMany({
            where,
            skip,
            take: limit,
            include: {
                users: {
                    select: {
                        userID: true,
                        name: true,
                        avatar: true,
                        freelancer_profiles: {
                            select: {
                                rating: true,
                                reviewCount: true
                            }
                        }
                    }
                },
                categories: true
            }
        }),

        prisma.gigs.count({ where })
    ])

    return {
        page,
        limit,
        total,
        data: gigs
    }
}

const getGigByIdService = async (id) => {

    const gig = await prisma.gigs.findUnique({
        where: { gigID: id },
        include: {
            gig_packages: true
        }
    })

    if (!gig) {
        throw new AppError("Gig not found", 404)
    }

    return gig
}

const createGigService = async(userId, data) => {
    const freelancer = await prisma.freelancer_profiles.findUnique({
        where: {userID: userId}
    })

    if(!freelancer){
        throw new AppError("You must become freelancer first", 403)
    }

    const category = await prisma.categories.findUnique({
        where: { categoryID: data.categoryID }
    })

    if (!category) {
        throw new AppError("Category not found", 404)
    }

    const gig = await prisma.gigs.create({
        data: {
            title: data.title,
            description: data.description,
            img_url: data.img_url,
            categoryID: data.categoryID,
            freelancerID: userId,

            gig_packages: {
                create: data.packages
            }
        },

        include: {
            gig_packages: true
        }
    })

    return gig
}

const updateGigService = async(gigId, userId, data) => {
    const gig = await prisma.gigs.findUnique({
        where: {gigID: gigId}
    })

    if(!gig){
        throw new AppError("Gig not found", 404)
    }

    if(gig.freelancerID !== userId){
        throw new AppError("Forbidden", 403);
    }

    if (data.categoryID) {

        const category = await prisma.categories.findUnique({
            where: { categoryID: data.categoryID }
        })

        if (!category) {
            throw new AppError("Category not found", 404)
        }
    }

    const updateGig = await prisma.gigs.update({
        where: {gigID: gigId},
        data
    })

    return updateGig
}

const deleteGigService = async(gigId, userId) => {
    const gig = await prisma.gigs.findUnique({
        where: {gigID: gigId}
    })

    if(!gig){
        throw new AppError("Gig not found", 404)
    }

    if(gig.freelancerID !== userId){
        throw new AppError("Forbidden", 403);
    }

    const deleteGig = await prisma.gigs.delete({
        where: {gigID: gigId}
    })

    return deleteGig
}

module.exports = { getGigsService, getGigByIdService, createGigService, updateGigService, deleteGigService }