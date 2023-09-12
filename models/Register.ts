import * as z from 'zod'

export const registerDrafrSchema = z.object({
  nickName: z.string(),
})

export const registerSchema = registerDrafrSchema.extend({
  auth0Id: z.string(),
})

export type RegisterDraft = z.infer<typeof registerDrafrSchema>
export type Register = z.infer<typeof registerSchema>
