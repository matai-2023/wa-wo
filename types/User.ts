import * as z from 'zod'

const userSchema = z.object({
  auth0_id: z.string(),
  nickname: z.string(),
})

export type User = z.infer<typeof userSchema>
