export async function seed(knex) {
  await knex('users').insert([
    {
      auth0_id: 'auth0|65010b645218b17b091d01fe',
      nickName: 'MataiGuy',
    },
    {
      auth0_id: 'auth0|6500f4b1f6aa1817d80e5465',
      nickName: 'ExampleGuy',
    },
    {
      auth0_id: 'auth0|6501074ac25b71c07e590847',
      nickName: 'AbcGuy',
    },
    {
      auth0_id: 'auth0|6508ddcd7e52c58fd7f13549',
      nickName: 'youn@matai.com',
    },
    {
      auth0_id: 'auth0|650a38a60889cb914272a210',
      nickName: 'neil@matai.com',
    },
    {
      auth0_id: 'auth0|650a3940bc4a2acbef2ad546',
      nickName: 'simon@matai.com',
    },
    {
      auth0_id: 'auth0|650a39b70889cb914272a2ea',
      nickName: 'ryan@matai.com',
    },
  ])
}
