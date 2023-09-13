import { Wardrobe } from '../../types/MyWardrobe.ts'
import connection from './connection.ts'
import db from './connection.ts'

export async function getAllwardrobe(auth0Id: string) {
  return (await db('wardrobe')
    .where('auth0_id', auth0Id)
    .select()) as Wardrobe[]
}

// export function addFruit(db = connection) {
//   return db('wardrobe').insert(fruit)
// }

// export function updateFruit( db = connection) {
//   return db('wardrobe').where('id', newFruit.id).update(newFruit)
// }

// export function deleteFruit(id: number, db = connection) {
//   return db('wardrobe').where('id', id).delete()
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
