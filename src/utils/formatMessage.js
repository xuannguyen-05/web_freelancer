const formatMessage = (msg) => ({
    id: msg.messageID,
    content: msg.content,
    sender: {
        id: msg.users.userID,
        name: msg.users.name,
        avatar: msg.users.avatar
    },
    readAt: msg.read_at,
    createdAt: msg.created_at
})

module.exports = formatMessage