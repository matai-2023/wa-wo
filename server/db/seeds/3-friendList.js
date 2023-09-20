export async function seed(knex) {
  await knex('friendList').insert([
    {
      id: 1,
      user_id: 'auth0|65010b645218b17b091d01fe',
      friend_id: 'auth0|6500f4b1f6aa1817d80e5465',
    },
    {
      id: 2,
      user_id: 'auth0|6500f4b1f6aa1817d80e5465',
      friend_id: 'auth0|65010b645218b17b091d01fe',
    },
    {
      id: 3,
      user_id: 'auth0|650a38a60889cb914272a210',
      friend_id: 'auth0|6508ddcd7e52c58fd7f13549',
    },
    {
      id: 4,
      user_id: 'auth0|6508ddcd7e52c58fd7f13549',
      friend_id: 'auth0|650a38a60889cb914272a210',
    },
    {
      id: 5,
      user_id: 'auth0|650a38a60889cb914272a210',
      friend_id: 'auth0|650a3940bc4a2acbef2ad546',
    },
    {
      id: 6,
      user_id: 'auth0|650a3940bc4a2acbef2ad546',
      friend_id: 'auth0|650a38a60889cb914272a210',
    },
  ])
}
