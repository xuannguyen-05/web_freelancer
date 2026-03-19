const { z } = require("zod")

// ---------------------------------- xem lại

const createFreelancerSchema = z.object({
  slogan: z.string().max(255, "Slogan too long").optional(),
  descriptions: z.string().max(1000, "Description too long").optional(),
  skills: z.array(z.number().int().positive()).optional()
}).strict()

const updateFreelancerSchema = createFreelancerSchema.partial()

module.exports = { createFreelancerSchema, updateFreelancerSchema }