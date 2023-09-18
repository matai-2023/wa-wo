import {
  expectTypeOf,
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
} from 'vitest'
import db from './connection'
import { addLike, countAllLikes, removeLike } from './likesdb'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('1.Add likes', () => {
  it('1.1 Should add a like record of an user to an outfit', async () => {
    const userId = 'auth0|6501074ac25b71c07e590847'
    const outfitId = 2
    const likeCount = await countAllLikes()
    await addLike(userId, outfitId)
    const likeAfter = await countAllLikes()
    const changes = likeAfter - likeCount
    expect(changes).toBe(1)
  })

  it('1.2 Should not duplicate the like', async () => {
    const userId = 'auth0|6501074ac25b71c07e590847'
    const outfitId = 2
    const likeCount = await countAllLikes()
    await addLike(userId, outfitId)
    await addLike(userId, outfitId)
    await addLike(userId, outfitId)
    const likeAfter = await countAllLikes()
    const changes = likeAfter - likeCount
    expect(changes).toBe(1)
  })
})

describe('2.Remove likes', () => {
  it('2.1 should remove a like record of the user to an outfit', async () => {
    const userId = 'auth0|6501074ac25b71c07e590847'
    const outfitId = 2
    const likeCount = await countAllLikes()
    await removeLike(userId, outfitId)
    const likeAfter = await countAllLikes()
    const changes = likeAfter - likeCount
    expect(changes).toBe(0)
  })
})
