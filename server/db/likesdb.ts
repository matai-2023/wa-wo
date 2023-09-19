import connection from './connection.ts'
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
export async function addLike(
  userId: string,
  outfitId: number,
  db = connection
) {
  const current = await db('likes')
    .where('user_id', userId)
    .where('outfit_id', outfitId)
  if (current.length !== 0) {
    return
  } else {
    await db('likes').insert({ user_id: userId, outfit_id: outfitId })
  }
}
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
export async function removeLike(
  userId: string,
  outfitId: number,
  db = connection
) {
  await db('likes').where('user_id', userId).where('outfit_id', outfitId).del()
}
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
export async function countLikes(outfitId: number, db = connection) {
  return db('likes').where('outfit_id', outfitId).count('id as count').first()
}
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

export async function checkLikes(
  userId: string,
  outfitId: number,
  db = connection
) {
  const likes = await db('likes')
    .where('user_id', userId)
    .where('outfit_id', outfitId)
    .select()
    .first()
  if (likes) return true
  else return false
}
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//Functions for testing purposes only-----------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

export async function countAllLikes(db = connection) {
  const value = await db('likes').count('id as count').first()
  return value?.count as number
}
