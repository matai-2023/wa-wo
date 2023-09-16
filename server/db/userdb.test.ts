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
  addFriend,
  countFriendship,
  countUsers,
  getAllUsers,
  getFriends,
  getUser,
  upsertUser,
} from './userdb'
import { findItemByName } from './wardrobedb'
import { countReset } from 'console'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('1. Get User', () => {
  //---------------------------------------------------
  //---------------------------------------------------
  it('1.1 Should return the an user', async () => {
    const user = await getUser('auth0|65010b645218b17b091d01fe')
    expect(user).toBeDefined()
  })
  //---------------------------------------------------
  //---------------------------------------------------
  it('1.2 Should return user with the right type', async () => {
    const user = await getUser('auth0|65010b645218b17b091d01fe')
    expect(user).toHaveProperty('auth0_id')
    expect(user).toHaveProperty('nickname')
  })
})

describe('2. Get friends', () => {
  //---------------------------------------------------
  //---------------------------------------------------
  it('2.1 Should return a list of friend', async () => {
    const friends = await getFriends('auth0|65010b645218b17b091d01fe')
    expect(friends).toBeDefined()
  })
  //---------------------------------------------------
  //---------------------------------------------------
  it('2.2 Should return the right friend', async () => {
    const friend = {
      auth0_id: 'auth0|6500f4b1f6aa1817d80e5465',
      nickname: 'example@example.com',
    }
    const friends = await getFriends('auth0|65010b645218b17b091d01fe')
    const realFriend = friends.find(
      (item) => item.auth0_id == 'auth0|6500f4b1f6aa1817d80e5465'
    )
    expect(realFriend).toStrictEqual(friend)
  })
})

describe('3. Get All Users', () => {
  it('Should return all registered users', async () => {
    const allUsers = await getAllUsers()
    expect(allUsers).toHaveLength(3)
  })
})

describe('4. Upsert Users', () => {
  //-------------------------------------------------------
  //-------------------------------------------------------
  it('4.1 Should add a new user in the database', async () => {
    const preCount = await countUsers()
    const newUser = {
      auth0_id: 'test-id',
      nickname: 'test-nickname',
    }
    await upsertUser(newUser)
    const afterCount = await countUsers()
    const changes = afterCount - preCount
    expect(changes).toBe(1)
  })
  //-------------------------------------------------------
  //-------------------------------------------------------
  it('4.2 Should edit an user in the database', async () => {
    const preCount = await countUsers()
    const newUser = {
      auth0_id: 'auth0|65010b645218b17b091d01fe',
      nickname: 'IamACoolGuy',
    }
    await upsertUser(newUser)
    const afterCount = await countUsers()
    const changes = afterCount - preCount
    expect(changes).toBe(0)
  })
  //-------------------------------------------------------
  //-------------------------------------------------------
  it('4.3 Should edit the right user in the database', async () => {
    const oldUser = await getUser('auth0|65010b645218b17b091d01fe')
    const newProfile = {
      auth0_id: 'auth0|65010b645218b17b091d01fe',
      nickname: 'IamACoolGuy',
    }
    await upsertUser(newProfile)
    const editedUser = await getUser('auth0|65010b645218b17b091d01fe')
    expect(oldUser == editedUser).toBeFalsy()
  })
})

describe('5. Add friends', () => {
  //---------------------------------------------------
  //---------------------------------------------------
  it('5.1 Should add a relationship between 2 people', async () => {
    const countBefore = await countFriendship()
    const newRelationship = {
      user_id: 'auth0|65010b645218b17b091d01fe',
      friend_id: 'auth0|6501074ac25b71c07e590847',
    }
    await addFriend(newRelationship)
    const countAfter = await countFriendship()
    const changes = countAfter - countBefore
    expect(changes).toBe(2)
  })
  //---------------------------------------------------
  //---------------------------------------------------
  it('5.2 Should return add the right friends', async () => {
    const newRelationship = {
      user_id: 'auth0|65010b645218b17b091d01fe',
      friend_id: 'auth0|6501074ac25b71c07e590847',
    }
    await addFriend(newRelationship)
    const checker = await getFriends('auth0|65010b645218b17b091d01fe')

    expect(checker).toBeDefined()
  })
  //---------------------------------------------------
  //---------------------------------------------------
  it('5.3 Should not add friendship when they already are friends', async () => {
    try {
      const newRelationship = {
        user_id: 'auth0|65010b645218b17b091d01fe',
        friend_id: 'auth0|6500f4b1f6aa1817d80e5465',
      }
      await addFriend(newRelationship)
    } catch (error) {
      if (error instanceof Error) {
        expect(error?.message).toBe('Duplicate!')
      }
    }
  })
})
