export function up(knex) {
  return knex.schema.createTable('likes', (table) => {
    table.increments('id').primary()
    table.string('user_id').references('users.auth0_id')
    table.integer('outfit_id').references('outfits.id')
  })
}

export function down(knex) {
  return knex.schema.dropTable('likes')
}
