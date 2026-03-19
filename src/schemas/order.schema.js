const { z } = require("zod")

const createOrderSchema = z.object({
  packageID: z.coerce.number().int().positive()
}).strict()

module.exports = { createOrderSchema }