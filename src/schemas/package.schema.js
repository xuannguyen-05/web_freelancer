const { z } = require("zod")

const packageSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  price: z.coerce.number().positive(),
  deliveryDay: z.coerce.number().int().min(1),
  revision: z.coerce.number().int().min(0).optional()
})

const createPackageSchema = packageSchema
const updatePackageSchema = packageSchema.partial()

module.exports = { packageSchema, createPackageSchema, updatePackageSchema }