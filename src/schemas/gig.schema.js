const { z } = require("zod")
const { packageSchema } = require("./package.schema")

const createGigSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().optional(),
  img_url: z.string().optional(),
  categoryID: z.coerce.number(),
  packages: z.array(packageSchema).min(1).max(3)
})

const updateGigSchema = z.object({
  title: z.string().trim().min(1).optional(),
  description: z.string().optional(),
  img_url: z.string().optional(),
  categoryID: z.coerce.number().optional()
})

module.exports = { createGigSchema, updateGigSchema }