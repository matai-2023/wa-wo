import db from './connection'

export async function getUser(auth0Id: string) {
  return await db('users').where('auth0_id', auth0Id).select('nickname').first()
}

// export async function upsertProfile() {
//   await db('users').insert(nickname: nickname).onConflict('auth0_id').merge()
// }

export async function getFriends(userId: string) {
  return await db('friendList')
    .join('users', 'friendList.friend_id', 'users.auth0_id')
    .select('users.auth0_id as id', 'nickname')
    .where('user_id', userId)
}

// export async function searchFriends(userId: string, q: string) {
//   const rawQuery = `
//   SELECT DISTICT uu.nickname
//   FROM (
//     SELECT friend_id
//     FROM frinedList
//     WHERE user_id = ?
//   ) AS f
//   CROSS JOIN (
//     SELECT DISTINCT auth0_id as user_id
//     FROM users
//     WHERE auth0_id <> ?
//   ) AS u
//   LEFT JOIN friendList AS existing
//   ON exsiting.user_id = ? AND existing.following_id = u.user_id
//   RIGHT JOIN users as uu ON uu.auth0_id = existing.following_id
//   RIGHT JOIN wardrobe as w ON w.user_id = uu.auth0_id
//   WHERE existing.user_id IS NULL
//   AND uu.auth)_id <> ?
//   AND (LOWER(uu.nickname) LIKE ?)
//   `

//   const newUsersToFollow = await db.raw(rawQuery, [userId, userId, userId, userId, `%${q}`, `%${q}`,`%${q}`,`%${q}`])
//   return newUsersToFollow
// }
