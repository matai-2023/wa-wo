export async function seed(knex) {
  await knex('likes').insert([
    {
      id: 1,
      user_id: 'auth0|6500f4b1f6aa1817d80e5465',
      outfit_id: 1,
    },
    {
      id: 2,
      user_id: 'auth0|65010b645218b17b091d01fe',
      outfit_id: 2,
    },
  ])
}
