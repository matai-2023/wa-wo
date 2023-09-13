import * as z from 'zod'

const userSchema = z.object({
    auth0Id: z.string(),
    nickname: z.string()
})

export type User = z.infer<typeof userSchema>