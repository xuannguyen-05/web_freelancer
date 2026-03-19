const formatFreelancer = (freelancer) => {
  if (!freelancer) return null

  return {
    userID: freelancer.userID,
    slogan: freelancer.slogan,
    descriptions: freelancer.descriptions,
    level: freelancer.level,
    rating: Number(freelancer.rating),
    reviewCount: freelancer.reviewCount
  }
}

module.exports = formatFreelancer