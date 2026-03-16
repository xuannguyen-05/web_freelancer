const prisma = require("../config/prisma")
const AppError = require("../utils/AppError")

const createFreelancerService = async(userId, data) => {

    const existed = await prisma.freelancer_profiles.findUnique({
        where: {
            userID: userId
        }
    })

    if(existed){
        throw new AppError("Freelancer profile already exists", 409)
    }

    const freelancer = await prisma.freelancer_profiles.create({
        data: {
            userID: userId,
            slogan: data.slogan,
            descriptions: data.descriptions
        }
    })

    // add freelancer role
    const roleExist = await prisma.user_roles.findFirst({
        where:{
            userID:userId,
            roleID:2
        }
    })

    if(!roleExist){
        await prisma.user_roles.create({
            data:{
                userID:userId,
                roleID:2
            }
        })
    }

    if(data.skills?.length){

        const uniqueSkills = [...new Set(data.skills)]

        const skills = await prisma.skills.findMany({
            where: {
                skillID: {in: uniqueSkills}
            }
        })

        if(skills.length !== uniqueSkills.length){
            throw new AppError("Invalid skill", 400)
        }

        const skillData = uniqueSkills.map(skillId => ({
            userID: userId,
            skillID: skillId
        }))

        await prisma.freelancer_skills.createMany({
            data: skillData
        })
    }

    return freelancer
}

const getFreelancerByIdService = async(id) => {
    const freelancer = await prisma.freelancer_profiles.findUnique({
        where: {userID: id},
        include: {
            users: {
                include: {
                    freelancer_skills: {
                        include: {
                            skills: true
                        }
                    }
                }
            }
        }
    })

    if(!freelancer){
        throw new AppError("Freelancer Not Found", 404)
    }

    return freelancer

}

const getMyFreelancerService = async(userId) => {
    const me = await prisma.freelancer_profiles.findUnique({
        where: {userID: userId},
    })

    if(!me){
        throw new AppError("Freelancer Profile Not Found", 404);
        
    }
    
    return me
}

const updateMyFreelancerService = async(userId, data) => {

    const {skills, ...profileData} = data 

    const me = await prisma.freelancer_profiles.update({
        where: {userID: userId},
        data: profileData
    })

    if(skills){
        const uniqueSkills = [...new Set(skills)]

        await prisma.freelancer_skills.deleteMany({
            where: {
                userID: userId
            }
        })

        await prisma.freelancer_skills.createMany({
            data: uniqueSkills.map(skillId => ({
                userID: userId,
                skillID: skillId
            }))
        })
    }
    
    return me
}

module.exports = { createFreelancerService, getFreelancerByIdService, getMyFreelancerService, updateMyFreelancerService}

    