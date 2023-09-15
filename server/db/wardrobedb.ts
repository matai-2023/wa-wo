import { AddWardrobe } from '../../types/MyWardrobe.ts'

import connection from './connection.ts'

export async function getAllwardrobe(auth0Id: string, db = connection) {
  return await db('wardrobe').where('user_id', auth0Id).select()
}

export function deleteItem(id: number, db = connection) {
  return db('wardrobe').where('id', id).delete()
}

export function addItem(newItem: AddWardrobe, db = connection) {
  return db('wardrobe').insert(newItem)
}

//
//
//These functions are for testing purposes only
//Any actual functions should go above
//
//
export async function countItems(db = connection) {
  const value = await db('wardrobe').count('id as count').first()
  return value?.count as number
}
export async function findItemByName(name: string, db = connection) {
  return db('wardrobe').where('name', name).select().first()
}
