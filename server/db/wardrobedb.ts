
import { AddWardrobe } from '../../types/MyWardrobe.ts'

import connection from './connection.ts'
import db from './connection.ts'

export async function getAllwardrobe(auth0Id: string) {
  return await db('wardrobe').where('user_id', auth0Id).select()
}

export function deleteItem(id: number, db = connection) {
  return db('wardrobe').where('id', id).delete()
}

export async function countItems(db = connection) {
  const value = await db('wardrobe').count('id as count').first()
  return value?.count as number
}

export function addItem(newItem: AddWardrobe) {
  return db('wardrobe').insert(newItem)
}

// export function updateFruit( db = connection) {
//   return db('wardrobe').where('id', newFruit.id).update(newFruit)
// }

// export function userCanEdit(fruitId: number, auth0Id: string, db = connection) {
//   return db('wardrobe')
//     .where('id', fruitId)
//     .first()
//     .then((fruit: FruitSnakeCase) => {
//       if (fruit.added_by_user !== auth0Id) {
//         throw new Error('Unauthorized')
//       }
//     })
// }
