import connection from './connection.ts'
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//Outfit functions-----------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
export async function getAllOutfits(db = connection) {
  const outfits = await db('outfits')
    .select(
      'outfits.id',
      'outfits.user_id',
      'outfits.img',
      'wardrobe_top.name as top',
      'wardrobe_bottom.name as bottom',
      'wardrobe_outer.name as outer',
      'wardrobe_accessories.name as accessories',
      'wardrobe_footwear.name as footwear',
      'outfits.date_posted'
    )
    .leftJoin('wardrobe as wardrobe_top', 'outfits.top_id', 'wardrobe_top.id')
    .leftJoin(
      'wardrobe as wardrobe_bottom',
      'outfits.bottom_id',
      'wardrobe_bottom.id'
    )
    .leftJoin(
      'wardrobe as wardrobe_outer',
      'outfits.outer_id',
      'wardrobe_outer.id'
    )
    .leftJoin(
      'wardrobe as wardrobe_accessories',
      'outfits.accessories_id',
      'wardrobe_accessories.id'
    )
    .leftJoin(
      'wardrobe as wardrobe_footwear',
      'outfits.footwear_id',
      'wardrobe_footwear.id'
    )

  // Map the results to the desired format
  const formattedOutfits = outfits.map((outfit) => ({
    id: outfit.id,
    user_id: outfit.user_id,
    img: outfit.img,
    top: outfit.top || '',
    bottom: outfit.bottom || '',
    outer: outfit.outer || '',
    accessories: outfit.accessories || '',
    footwear: outfit.footwear || '',
    date_posted: new Date(outfit.date_posted).getTime(),
  }))

  return formattedOutfits
}

export async function getOutfitsByUserId(userId: string, db = connection) {
  const outfits = await db('outfits')
    .where('outfits.user_id', userId)
    .select(
      'outfits.id',
      'outfits.user_id',
      'outfits.img',
      'wardrobe_top.name as top',
      'wardrobe_bottom.name as bottom',
      'wardrobe_outer.name as outer',
      'wardrobe_accessories.name as accessories',
      'wardrobe_footwear.name as footwear',
      'outfits.date_posted'
    )
    .leftJoin('wardrobe as wardrobe_top', 'outfits.top_id', 'wardrobe_top.id')
    .leftJoin(
      'wardrobe as wardrobe_bottom',
      'outfits.bottom_id',
      'wardrobe_bottom.id'
    )
    .leftJoin(
      'wardrobe as wardrobe_outer',
      'outfits.outer_id',
      'wardrobe_outer.id'
    )
    .leftJoin(
      'wardrobe as wardrobe_accessories',
      'outfits.accessories_id',
      'wardrobe_accessories.id'
    )
    .leftJoin(
      'wardrobe as wardrobe_footwear',
      'outfits.footwear_id',
      'wardrobe_footwear.id'
    )

  // Map the results to the desired format
  const formattedOutfits = outfits.map((outfit) => ({
    id: outfit.id,
    user_id: outfit.user_id,
    img: outfit.img,
    top: outfit.top || '',
    bottom: outfit.bottom || '',
    outer: outfit.outer || '',
    accessories: outfit.accessories || '',
    footwear: outfit.footwear || '',
    date_posted: new Date(outfit.date_posted).getTime(),
  }))

  return formattedOutfits
}

interface OutfitToAdd {
  img: string
  top_id: number
  bottom_id: number
  outer_id: number
  accessories_id: number
  footwear_id: number
}

export async function addOutfit(
  userId: string,
  outfit: OutfitToAdd,
  db = connection
) {
  await db('outfits').insert({
    user_id: userId,
    img: outfit.img,
    top_id: outfit.top_id,
    bottom_id: outfit.bottom_id,
    outer_id: outfit.outer_id,
    accessories_id: outfit.accessories_id,
    footwear_id: outfit.footwear_id,
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
