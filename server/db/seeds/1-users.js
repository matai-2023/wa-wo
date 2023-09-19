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
  ])
}
