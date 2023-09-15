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
