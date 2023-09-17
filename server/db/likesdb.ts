import connection from './connection.ts'

// interface Like {
//   user_id: string
//   outfit_id: number
// }
export async function addLike(
  userId: string,
  outfitId: number,
  db = connection
) {
  await db('likes').insert({
    user_id: userId,
    outfit_id: outfitId,
  })
}
export async function removeLike(userId: string, db = connection) {}

export async function countLikes() {}
