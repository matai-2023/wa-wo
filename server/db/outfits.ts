import fsPromises from 'node:fs/promises'
import connection from './connection.ts'
import path from 'node:path/posix'
import * as Path from 'node:path/posix'
import * as URL from 'node:url'
import { v2 as cloudinary } from 'cloudinary'
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//setting cloudinary----------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
cloudinary.config({
  cloud_name: 'dzfzt0p5v',
  api_key: '616443461267278',
  api_secret: 'khF_PKqC60Ou9xGxfVvvJV0EUGg',
})
//seting file path-----------------------------------------
const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)
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
      'outfits.description',
      'wardrobe_top.name as top',
      'wardrobe_bottom.name as bottom',
      'wardrobe_outer.name as outer',
      'wardrobe_accessories.name as accessories',
      'wardrobe_footwear.name as footwear',
      'outfits.date_posted',
      'users.nickname as nickname'
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
    .leftJoin('users', 'users.auth0_id', 'outfits.user_id')

  // Map the results to the desired format
  const formattedOutfits = outfits.map((outfit) => ({
    id: outfit.id,
    user_id: outfit.user_id,
    img: outfit.img,
    nickname: outfit.nickname,
    top: outfit.top || '',
    bottom: outfit.bottom || '',
    outer: outfit.outer || '',
    description: outfit.description || '',
    accessories: outfit.accessories || '',
    footwear: outfit.footwear || '',
    date_posted: new Date(outfit.date_posted).getTime(),
  }))

  return formattedOutfits
}
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
export async function getOutfitsByUserId(userId: string, db = connection) {
  const outfits = await db('outfits')
    .where('outfits.user_id', userId)
    .select(
      'outfits.id',
      'outfits.user_id',
      'outfits.img',
      'outfits.description',
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
    description: outfit.description || '',
    outer: outfit.outer || '',
    accessories: outfit.accessories || '',
    footwear: outfit.footwear || '',
    date_posted: new Date(outfit.date_posted).getTime(),
  }))

  return formattedOutfits
}
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
export interface OutfitToAdd {
  img: string
  top_id: number | null
  bottom_id: number | null
  outer_id: number | null
  accessories_id: number | null
  footwear_id: number | null
  description: string
  public_id: string | null
}
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
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
    description: outfit.description,
    date_posted: new Date(Date.now()),
    public_id: outfit.public_id,
  })
}
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
export async function removeOutfit(id: number, db = connection) {
  const item = await db('outfits').where('id', id).select().first()

  try {
    const result = await cloudinary.uploader.destroy(item.public_id)
  } catch (error) {
    console.error('Error deleting image:', error)
  }
  await db('likes').where('outfit_id', id).del()
  await db('comments').where('outfit_id', id).del()
  await db('outfits').where('id', id).del()
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
    .join('outfits', 'outfits.id', 'comments.outfit_id')
    .where('outfits.id', outfitId)
    .select(
      'comments.id as commentId',
      'comments.user_id as userId',
      'date_commented as date',
      'outfits.id as outfitId',
      'nickname as nickname',
      'comment as comment'
    )
}
interface CommentToAdd {
  outfitId: number
  comment: string
}
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
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
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
export async function removeComment(id: number, db = connection) {
  await db('comments').where('id', id).delete()
}
//Function for testing purpose only
export async function countAllComments(db = connection) {
  const value = await db('comments').count('id as count').first()
  return value?.count as number
}

export async function countAllOutfits(db = connection) {
  const value = await db('outfits').count('id as count').first()
  return value?.count as number
}

export async function deleteOutfitImages(imgPath: string, db = connection) {
  const filePath = path.join(__dirname, '../../public', imgPath)
  try {
    await fsPromises.unlink(filePath)
  } catch (err) {
    console.error(
      'Dont worry about this error the file is just not in our sever'
    )
  }
}
