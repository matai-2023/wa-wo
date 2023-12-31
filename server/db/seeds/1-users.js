export async function seed(knex) {
  await knex('users').insert([
    {
      auth0_id: 'auth0|65010b645218b17b091d01fe',
      nickname: 'MataiGuy',
    },
    {
      auth0_id: 'auth0|6500f4b1f6aa1817d80e5465',
      nickname: 'ExampleGuy',
    },
    {
      auth0_id: 'auth0|6501074ac25b71c07e590847',
      nickname: 'AbcGuy',
    },
    {
      auth0_id: 'auth0|6508ddcd7e52c58fd7f13549',
      nickname: 'younie',
    },
    {
      auth0_id: 'auth0|650a38a60889cb914272a210',
      nickname: 'neil the Yes man',
    },
    {
      auth0_id: 'auth0|650a3940bc4a2acbef2ad546',
      nickname: 'siMon',
    },
    {
      auth0_id: 'auth0|650a39b70889cb914272a2ea',
      nickname: 'ryan@matai.com',
    },
  ])
}
