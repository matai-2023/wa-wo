import connection from './connection.ts'
import db from './connection.ts'

export async function getAllwardrobe(userId: string) {
  return await db('wardrobe').where('user_id', userId).select()
}

export function addFruit(fruit: FruitSnakeCase, db = connection) {
  return db('wardrobe').insert(fruit)
}

export function updateFruit(newFruit: FruitSnakeCase, db = connection) {
  return db('wardrobe').where('id', newFruit.id).update(newFruit)
}

export function deleteFruit(id: number, db = connection) {
  return db('wardrobe').where('id', id).delete()
}

export function userCanEdit(fruitId: number, auth0Id: string, db = connection) {
  return db('wardrobe')
    .where('id', fruitId)
    .first()
    .then((fruit: FruitSnakeCase) => {
      if (fruit.added_by_user !== auth0Id) {
        throw new Error('Unauthorized')
      }
    })
}
