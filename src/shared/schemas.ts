import { z } from 'zod'

export function setIdParamsSchema() {
  return z.object({
    id: z.string().uuid(),
  })
}
