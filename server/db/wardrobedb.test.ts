import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import db from './connection'
import {
  addItem,
  countItems,
  deleteItem,
  findItemByName,
  getAllwardrobe,
} from './wardrobedb'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('1. Get myWardrobe', () => {
  //-----------------------------------------------
  //-----------------------------------------------

  it('1.1 Should return items', async () => {
    const items = await getAllwardrobe('auth0|65010b645218b17b091d01fe')
    expect(items).toHaveLength(5)
  })

  //-----------------------------------------------
  //-----------------------------------------------

  it('1.2 Should return items with the right properties', async () => {
    const items = await getAllwardrobe('auth0|65010b645218b17b091d01fe')
    expect(items).toHaveLength(5)
    expect(items[0]).toHaveProperty('id')
    expect(items[0]).toHaveProperty('name')
    expect(items[0]).toHaveProperty('description')
    expect(items[0]).toHaveProperty('category')
    expect(items[0]).toHaveProperty('part')
    expect(items[0]).toHaveProperty('image')
  })

  //-----------------------------------------------
  //-----------------------------------------------

  it('1.3 Should delete selected item', async () => {
    const countBefore = await countItems()
    await deleteItem(1)
    const countAfter = await countItems()
    const items = countBefore - countAfter
    expect(items).toBe(1)
  })
})

//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------

describe('2. Add item to my-wardrobe', () => {
  //-----------------------------------------------
  //-----------------------------------------------

  it('2.1 Should an item to the database', async () => {
    const countBefore = await countItems()
    const testItem = {
      user_id: 'auth0|65010b645218b17b091d01fe',
      name: 'smelly socks',
      description: 'stinky',
      category: 'accesorries',
      part: 'casual',
      image: '../../public/IMG_5428',
    }
    await addItem(testItem)
    const countAfter = await countItems()
    const changes = countAfter - countBefore
    expect(changes).toBe(1)
  })

  //-----------------------------------------------
  //-----------------------------------------------

  it('2.2 Should add the right item to the database', async () => {
    const testItem = {
      user_id: 'auth0|65010b645218b17b091d01fe',
      name: 'smelly socks',
      description: 'stinky',
      category: 'accesorries',
      part: 'casual',
      image: '../../public/IMG_5428',
    }
    await addItem(testItem)
    const checker = await findItemByName('smelly socks')
    expect(checker).toBeDefined()
  })
})
