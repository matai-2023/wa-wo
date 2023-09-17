export function up(knex) {
  return knex.schema.createTable('outfits', (table) => {
    table.increments('id').primary()
    table.string('user_id').references('users.auth0_id').notNullable()
    table.string('img')
    table.integer('likes')
    table.date('date_posted')
  })
}

export function down(knex) {
  return knex.schema.dropTable('outfits')
}
