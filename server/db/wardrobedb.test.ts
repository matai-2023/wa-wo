import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest'
import request from 'superagent'
import { getMockToken } from '../routes/mockToken'
import db from './connection'
import { countItems, deleteItem, getAllwardrobe } from './wardrobedb'
import server from '../server'
import knex from 'knex'
import knexfile from './knexfile'
import * as wardrobe from '../db/wardrobedb'
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

  it('should delete selected item', async () => {
    const countBefore = await countItems()
    await deleteItem(1)
    const countAfter = await countItems()
    const items = countBefore - countAfter
    expect(items).toBe(1)
  })
})

vi.mock('../db/wardrobedb')

const testItem = {
  user_id: 'auth0|65010b645218b17b091d01fe',
  name: 'smelly socks',
  description: 'stinky',
  category: 'accesorries',
  part: 'casual',
  image: '../../public/IMG_5428',
}

describe('POST api/v1/my-wardrobe', () => {
  it('responds with 201 status on successful add', () => {
    vi.mocked(wardrobe.addItem).mockImplementation(() => Promise.resolve([1]))

    return request(server)
      .post('/api/v1/my-wardrobe')
      .set('Authorization', `Bearer ${getMockToken()}`)
      .send(testItem)
      .expect(201)
  })
  // it('responds with 500 Zod error when invalid data is sent', () => {
  //   vi.mocked(songs.insertSong).mockImplementation(() => Promise.resolve([1]))

  //   return request(server)
  //     .post('/api/v1/songs')
  //     .set('Authorization', `Bearer ${getMockToken()}`)
  //     .send({ title: 'Jammy Jam' })
  //     .expect(500)
  // })
  it('responds with 500 error when db function fails', () => {
    vi.mocked(wardrobe.addItem).mockImplementation(() =>
      Promise.reject(new Error('oops'))
    )

    return request(server)
      .post('/api/v1/my-wardrobe')
      .set('Authorization', `Bearer ${getMockToken()}`)
      .send(testItem)
      .expect(500)
      .then((err) => {
        expect(err.text).toBe('{"message":"Unable to add items"}')
      })
  })
})
