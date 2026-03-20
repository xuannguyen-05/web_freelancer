const formatReview = (review) => ({
    reviewId: review.reviewID,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.created_at,
    reviewer: review.reviewer ? {
        id: review.reviewer.userID,
        name: review.reviewer.name,
        avatar: review.reviewer.avatar
    } : null
})

module.exports = formatReview