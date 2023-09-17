export async function seed(knex) {
  await knex('comments').del()
  await knex('outfits').del()
  await knex('wardrobe').del()
  await knex('friendList').del()
  await knex('users').del()
}
