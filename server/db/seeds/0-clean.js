export function seed(knex) {
  knex('wardrobe').del()
  knex('friendList').del()
  knex('users').del()
}
