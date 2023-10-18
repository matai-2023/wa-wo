import { AddWardrobe } from '../../types/MyWardrobe.ts'
import connection from './connection.ts'
import { v2 as cloudinary } from 'cloudinary'

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//Setting up file path to delete purposes-------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
export async function getAllwardrobe(auth0Id: string, db = connection) {
  return await db('wardrobe').where('user_id', auth0Id).select()
}

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
export async function deleteItem(id: number, db = connection) {
  const item = await db('wardrobe').where('id', id).select().first()

  try {
    const result = await cloudinary.uploader.destroy(item.public_id)
  } catch (error) {
    console.error('Error deleting image:', error)
  }
  await db.transaction(async (trx) => {
    // Find the corresponding 'outfits' records that reference the item to be deleted
    const outfitsToUpdate = await trx('outfits')
      .select(
        'id',
        'top_id',
        'bottom_id',
        'outer_id',
        'accessories_id',
        'footwear_id'
      )
      .where('top_id', id)
      .orWhere('bottom_id', id)
      .orWhere('outer_id', id)
      .orWhere('accessories_id', id)
      .orWhere('footwear_id', id)

    // Update the corresponding 'outfits' records to set the references to null
    for (const outfit of outfitsToUpdate) {
      await trx('outfits').where('id', outfit.id).update({
        top_id: null,
        bottom_id: null,
        outer_id: null,
        accessories_id: null,
        footwear_id: null,
      })
    }

    // Delete the item from the 'wardrobe' table
    await trx('wardrobe').where('id', id).del()
  })
}

export function addItem(newItem: AddWardrobe, db = connection) {
  return db('wardrobe').insert(newItem)
}

//-----------------------------------------------
//-----------------------------------------------
//These functions are for testing purposes only
//Any actual functions should go above
//-----------------------------------------------
//-----------------------------------------------
export async function countItems(db = connection) {
  const value = await db('wardrobe').count('id as count').first()
  return value?.count as number
}
export async function findItemByName(name: string, db = connection) {
  return db('wardrobe').where('name', name).select().first()
}
