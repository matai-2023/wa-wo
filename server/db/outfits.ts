import connection from './connection.ts'
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//Outfit functions-----------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
export async function getAllOutfits(db = connection) {
  return await db('outfits').select()
}

export async function getOutfits(userId: string, db = connection) {
  return await db('outfits').where('user_id', userId).select()
}

interface OutfitToAdd {
  img: string
}

export async function addOutfit(
  userId: string,
  outfit: OutfitToAdd,
  db = connection
) {
  await db('outfits').insert({
    user_id: userId,
    img: outfit.img,

    date_posted: new Date(Date.now()),
  })
}

//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//Comments functions---------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
export async function getComments(outfitId: number, db = connection) {
  return await db('comments')
    .join('users', 'users.auth0_id', 'comments.user_id')
    .where('comments.outfit_id', outfitId)
    .select(
      'id as commentId',
      'date_commented as date',
      'nickname as nickname',
      'comment as comment'
    )
}
interface CommentToAdd {
  outfitId: number
  comment: string
}

export async function addComment(
  userId: string,
  comment: CommentToAdd,
  db = connection
) {
  await db('comments').insert({
    comment: comment.comment,
    outfit_id: comment.outfitId,
    user_id: userId,
    date_commented: new Date(Date.now()),
  })
}
