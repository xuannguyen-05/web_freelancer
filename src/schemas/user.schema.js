const { z } = require("zod")

// ---------------------------------- xem lại

const updateUserSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name cannot be empty")
    .optional(),

  avatar: z.string()
    .url("Avatar must be a valid URL")
    .optional(),

  bio: z.string()
    .trim()
    .max(500, "Bio must be less than 500 characters")
    .optional()
})
.strict()
.refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided"
  }
)


module.exports = {updateUserSchema}