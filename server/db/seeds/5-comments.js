export async function seed(knex) {
  await knex('comments').insert([
    {
      id: 1,
      comment: 'wow so cool',
      outfit_id: 1,
      user_id: 'auth0|6500f4b1f6aa1817d80e5465',
      date_commented: new Date(Date.now()),
    },
    {
      id: 2,
      outfit_id: 2,
      user_id: 'auth0|65010b645218b17b091d01fe',
      comment: 'Wow Cooler than mine',
      date_commented: new Date(Date.now()),
    },
  ])
}
