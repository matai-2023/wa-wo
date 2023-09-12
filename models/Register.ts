import * as z from 'zod'

export const registerDrafrSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  nickName: z.string(),
})

export const registerSchema = registerDrafrSchema.extend({
  auth0Id: z.string(),
})

export type RegisterDraft = z.infer<typeof registerDrafrSchema>
export type Register = z.infer<typeof registerSchema>
