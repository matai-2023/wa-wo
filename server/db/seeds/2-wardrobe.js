export async function seed(knex) {
  await knex('wardrobe').insert([
    {
      id: 1,
      user_id: 'auth0|65010b645218b17b091d01fe',
      name: 'Shirt',
      description: 'A shirt that is white',
      category: 'casual',
      part: 'top',
      image: '../../public/IMG_5428',
    },
  ])
}
