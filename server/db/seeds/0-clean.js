export async function seed(knex) {
  await knex('wardrobe').del()
  await knex('friendList').del()
  await knex('users').del()
}
