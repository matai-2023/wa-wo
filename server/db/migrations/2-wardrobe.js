export function up(knex) {
  return knex.schema.createTable('wardrobe', (table) => {
    table.increments('id').primary()
    table.string('user_id').references('users.auth0_id').notNullable()
    table.string('name')
    table.string('description')
    table.string('category')
    table.string('part')
    table.string('image').notNullable()
    table.string('public_id').nullable()
  })
}

export function down(knex) {
  return knex.schema.dropTable('wardrobe')
}
