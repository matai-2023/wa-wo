import connection from './connection.ts'

export async function addLike(
  userId: string,
  outfitId: number,
  db = connection
) {
  const current = await db('likes')
    .where('user_id', userId)
    .where('outfit_id', outfitId)
  if (current) {
    return
  } else {
    await db('likes').insert({ userId, outfitId })
  }
}
export async function removeLike(
  userId: string,
  outfitId: number,
  db = connection
) {
  await db('likes').where('user_id', userId).where('outfit_id', outfitId).del()
}

export async function countLikes(outfitId: number, db = connection) {
  return db('likes').where('outfit_id', outfitId).count('id as count').first()
}
