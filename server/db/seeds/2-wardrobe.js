export async function seed(knex) {
  await knex('wardrobe').insert([
    {
      id: 1,
      user_id: 'auth0|65010b645218b17b091d01fe',
      name: 'outer',
      description: 'A shirt that is white',
      category: 'outer',
      part: 'top',
      image: '/IMG_5428.jpg',
    },
    {
      id: 2,
      user_id: 'auth0|6500f4b1f6aa1817d80e5465',
      name: 'top',
      description: 'A shirt that is white',
      category: 'top',
      part: 'top',
      image: '/IMG_5430.jpg',
    },
    {
      id: 3,
      user_id: 'auth0|65010b645218b17b091d01fe',
      name: 'bottom',
      description: 'A shirt that is white',
      category: 'bottom',
      part: 'top',
      image: '/IMG_5431.jpg',
    },
    {
      id: 4,
      user_id: 'auth0|65010b645218b17b091d01fe',
      name: 'accessories',
      description: 'A shirt that is white',
      category: 'accessories',
      part: 'top',
      image: '/IMG_5428.jpg',
    },
    {
      id: 5,
      user_id: 'auth0|65010b645218b17b091d01fe',
      name: 'footwear',
      description: 'A shirt that is white',
      category: 'footwear',
      part: 'top',
      image: '/IMG_5430.jpg',
    },
    {
      id: 6,
      user_id: 'auth0|65010b645218b17b091d01fe',
      name: 'outer',
      description: 'A shirt that is white',
      category: 'outer',
      part: 'top',
      image: '/IMG_5431.jpg',
    },
    {
      id: 7,
      user_id: 'auth0|6500f4b1f6aa1817d80e5465',
      name: 'top',
      description: 'A shirt that is white',
      category: 'top',
      part: 'top',
      image: '/IMG_5430.jpg',
    },
    {
      id: 8,
      user_id: 'auth0|6500f4b1f6aa1817d80e5465',
      name: 'top',
      description: 'A shirt that is white',
      category: 'top',
      part: 'top',
      image: '/IMG_5428.jpg',
    },
    {
      id: 9,
      user_id: 'auth0|6500f4b1f6aa1817d80e5465',
      name: 'top',
      description: 'A shirt that is white',
      category: 'top',
      part: 'top',
      image: '/IMG_5431.jpg',
    },
    {
      id: 10,
      user_id: 'auth0|6500f4b1f6aa1817d80e5465',
      name: 'top',
      description: 'A shirt that is white',
      category: 'top',
      part: 'top',
      image: '/IMG_5428.jpg',
    },
    {
      id: 11,
      user_id: 'auth0|6500f4b1f6aa1817d80e5465',
      name: 'top',
      description: 'A shirt that is white',
      category: 'top',
      part: 'top',
      image: '/IMG_5430.jpg',
    },
    {
      id: 12,
      user_id: 'auth0|6500f4b1f6aa1817d80e5465',
      name: 'top',
      description: 'A shirt that is white',
      category: 'top',
      part: 'top',
      image: '/IMG_5431.jpg',
    },
    {
      id: 13,
      user_id: 'auth0|6500f4b1f6aa1817d80e5465',
      name: 'top',
      description: 'A shirt that is white',
      category: 'top',
      part: 'top',
      image: '/IMG_5430.jpg',
    },
    {
      id: 14,
      user_id: 'auth0|6500f4b1f6aa1817d80e5465',
      name: 'top',
      description: 'A shirt that is white',
      category: 'top',
      part: 'top',
      image: '/IMG_5431.jpg',
    },
    {
      id: 15,
      user_id: 'auth0|6500f4b1f6aa1817d80e5465',
      name: 'top',
      description: 'A shirt that is white',
      category: 'top',
      part: 'top',
      image: '/IMG_5431.jpg',
    },
  ])
}
