const formatUser = require("./formatUser")

const formatGig = (gig) => {
  if (!gig) return null

  return {
    gigID: gig.gigID,
    title: gig.title,
    description: gig.description,
    img_url: gig.img_url,
    created_at: gig.created_at,
    updated_at: gig.updated_at,
    categoryID: gig.categoryID,
    freelancerID: gig.freelancerID,

    // nested user
    user: gig.users
      ? {
          ...formatUser(gig.users),
          freelancerProfile: gig.users.freelancer_profiles
            ? {
                rating: Number(gig.users.freelancer_profiles.rating),
                reviewCount: gig.users.freelancer_profiles.reviewCount
              }
            : null
        }
      : null,

    category: gig.categories
      ? {
          categoryID: gig.categories.categoryID,
          name: gig.categories.categoryName,
          description: gig.categories.description
        }
      : null
  }
}

module.exports = formatGig