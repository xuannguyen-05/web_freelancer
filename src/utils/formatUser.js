const formatUser = (user) => {
  if (!user) return null

  return {
    userID: user.userID,
    name: user.name,
    email: user.email,
    avatar: user.avatar || "/default-avatar.png",
    bio: user.bio || ""
  }
}

module.exports = formatUser