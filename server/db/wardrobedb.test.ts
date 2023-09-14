import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import db from './connection'
import { countItems, deleteItem, getAllwardrobe } from './wardrobedb'
import knex from 'knex'
import knexfile from './knexfile'
// const db = knex(knexfile.test)

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('get myWardrobe', () => {
  it('should return items', async () => {
    const items = await getAllwardrobe('auth0|65010b645218b17b091d01fe')
    expect(items).toHaveLength(1)
    expect(items[0]).toHaveProperty('id')
    expect(items[0]).toHaveProperty('name')
    expect(items[0]).toHaveProperty('description')
    expect(items[0]).toHaveProperty('category')
    expect(items[0]).toHaveProperty('part')
    expect(items[0]).toHaveProperty('image')
  })

  // it('should delete selected item', async () => {
  //   const countBefore = await countItems()
  //   await deleteItem(1)
  //   const countAfter = await countItems()
  //   const items = countBefore - countAfter
  //   expect(items).toBe(1)
  // })
})
