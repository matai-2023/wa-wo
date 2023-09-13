import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import db from './connection'
import { getAllwardrobe } from './wardrobedb'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('getFriends', () => {
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
})
