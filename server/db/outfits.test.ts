import {
  expectTypeOf,
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
} from 'vitest'
import db from './connection'
import {
  addComment,
  countAllComments,
  countAllOutfits,
  getAllOutfits,
  removeComment,
  removeOutfit,
} from './outfits'
import { countAllLikes } from './likesdb'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

//----------------------Comments------------------------------
// describe('1.Add comment', () => {
//   it('1.1 Should add a comment to the comments table', async () => {
//     const userId = 'auth0|6501074ac25b71c07e590847'
//     const comment = { outfitId: 1, comment: 'testing' }
//     const countBefore = await countAllComments()
//     await addComment(userId, comment)
//     const countAfter = await countAllComments()
//     const changes = countAfter - countBefore
//     expect(changes).toBe(1)
//   })
// })

// describe('2.Remove comment', () => {
//   it('2.1 should remove a comment by id from the comments table ', async () => {

//     const id = 1
//     const countBefore = await countAllComments()
//     await removeComment(id)
//     const countAfter = await countAllComments()
//     const changes = countAfter - countBefore
//     expect(changes).toBe(-1)
//   })
// })

//--------------------Outfits-------------------------------
// describe('1.Get All outfits', () => {
//   it('1.1 Should return an array of all outfits', async () => {
//     const listLength = await countAllOutfits()
//     expect(listLength).toBe(5)
//   })
// })

// describe('2.Remove an outfit', () => {
//   it('2.1 should remove an outfit by id from the outfits table ', async () => {
//     const id = 1
//     const outfitCountBefore = await countAllOutfits()
//     await removeOutfit(id)
//     const outfitCountAfter = await countAllOutfits()
//     const outfitChange = outfitCountAfter - outfitCountBefore

//     expect(outfitChange).toBe(-1)
//   })
// })
