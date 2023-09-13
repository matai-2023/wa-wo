import * as z from 'zod'

const wardrobeSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  part: z.string(),
  image: z.string(),
})

export type Wardrobe = z.infer<typeof wardrobeSchema>
