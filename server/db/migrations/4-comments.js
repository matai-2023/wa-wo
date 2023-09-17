export function up(knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id').primary()
    table.string('comment')
    table.integer('outfit_id').references('outfits.id').notNullable()
    table.string('user_id').references('users.auth0_id').notNullable()
    table.date('date_commented')
  })
}

export function down(knex) {
  return knex.schema.dropTable('comments')
}
