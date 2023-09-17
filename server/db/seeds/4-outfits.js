export async function seed(knex) {
  await knex('outfits').insert([
    {
      id: 1,
      user_id: 'auth0|65010b645218b17b091d01fe',
      img: 'https://exxpozed-image.de/exxpozed-res.cloudinary.com/image/upload/q_auto:eco,w_1500,h_1500,c_pad,b_white,d_ph.gif,e_sharpen/v20230814123732/catalog/the-north-face-w-cragmont-fleece-jacket-21b-tnf-nf0a5a9l-gardenia-white-1.jpg',
      likes: 0,
      date_posted: new Date(Date.now()),
    },
    {
      id: 2,
      user_id: 'auth0|6500f4b1f6aa1817d80e5465',
      img: 'https://www.galaxiaradio.com/wp-content/uploads/2023/04/paloma-wool-jackets-womens-no-1009-hokusai-brown.jpg',
      likes: 0,
      date_posted: new Date(Date.now()),
    },
  ])
}
