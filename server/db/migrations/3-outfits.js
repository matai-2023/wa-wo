export function up(knex) {
  return knex.schema.createTable('outfits', (table) => {
    table.increments('id').primary()
    table.string('user_id').references('users.auth0_id').notNullable()
    table.string('img').notNullable()
    table.string('description')
    table.integer('top_id').references('wardrobe.id').nullable()
    table.integer('bottom_id').references('wardrobe.id').nullable()
    table.integer('outer_id').references('wardrobe.id').nullable()
    table.integer('accessories_id').references('wardrobe.id').nullable()
    table.integer('footwear_id').references('wardrobe.id').nullable()
    table.date('date_posted')
    table.string('public_id').nullable()
  })
}

export function down(knex) {
  return knex.schema.dropTable('outfits')
}
