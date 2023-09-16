import { User } from '../../types/User'
import db from './connection'

export async function getUser(auth0Id: string) {
  return await db('users').where('auth0_id', auth0Id).select().first()
}

export async function getFriends(userId: string) {
  return await db('friendList')
    .join('users', 'friendList.friend_id', 'users.auth0_id')
    .select('users.auth0_id as id', 'nickname')
    .where('user_id', userId)
}

export async function getAllUsers() {
  return await db('users').select()
}

export async function upsertUser(user: User) {
  await db('users').insert(user).onConflict('auth0_id').merge()
}
export interface Relationship {
  user_id: string
  friend_id: string
}
export async function addFriend(relationship: Relationship) {
  const friends = await db('friendList')
    .where('user_id', relationship.user_id)
    .where('friend_id', relationship.friend_id)

  if (friends.length == 0) {
    await db('friendList').insert({
      user_id: relationship.user_id,
      friend_id: relationship.friend_id,
    })
    await db('friendList').insert({
      friend_id: relationship.friend_id,
      user_id: relationship.user_id,
    })
  } else {
    throw new Error('Duplicate!')
  }
}

//-----------------------------------------------
//-----------------------------------------------
//Function(s) with testing purposes only---------
//-----------------------------------------------
//-----------------------------------------------
export async function countUsers() {
  const value = await db('users').count('auth0_id as count').first()
  return value?.count as number
}

export async function countFriendship() {
  const value = await db('friendList').count('id as count').first()
  return value?.count as number
}
