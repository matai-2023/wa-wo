export function up(knex) {
  return knex.schema.createTable('outfits', (table) => {
    table.increments('id').primary()
    table.string('user_id').references('users.auth0_id').notNullable()
    table.string('img')
    table.string('top_id').references('wardrobe.id').nullable()
    table.string('bottom_id').references('wardrobe.id').nullable()
    table.string('outer_id').references('wardrobe.id').nullable()
    table.string('accessories_id').references('wardrobe.id').nullable()
    table.string('footwear_id').references('wardrobe.id').nullable()
    table.date('date_posted')
  })
}

export function down(knex) {
  return knex.schema.dropTable('outfits')
}
