export function up(knex) {
  return knex.schema.createTable('friendList', (table) => {
    table.string('id').primary()
    table.string('user_id').references('users.auth0_id').notNullable()
    table.string('friend_id').references('users.auth0_id').notNullable()
  })
}

export function down(knex) {
  return knex.schema.dropTable('friendList')
}
