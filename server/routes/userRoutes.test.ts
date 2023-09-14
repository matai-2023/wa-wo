import { vi, describe, it, expect } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/userdb'
import { getMockToken } from './mockToken'

vi.mock('../db/userdb')

describe('GET /api/v1/users/friends', () => {
  it('should return 200 with an array', async () => {
    const fakeFriends = [
      {
        id: '123',
        nickname: 'banana',
      },
    ]

    vi.mocked(db.getFriends).mockResolvedValue(fakeFriends)
    const response = await request(server)
      .get('/api/v1/users/friends')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(fakeFriends)
  })

  it('should return 500 when no access token is passed', async () => {
    vi.mocked(db.getFriends).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get('/api/v1/users/friends')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({ message: 'Unable to retrieve friends' })
  })
})

// describe('GET /api/v1/users', () => {
//   it('should return 200 with a user', async () => {
//     const fakeUser: Profile = {
//       auth0Id: '123',
//       nickname: 'banana',
//       firstName: 'Ripe',
//       lastName: 'Banana',
//       public: true,
//     }

//     vi.mocked(db.getUser).mockResolvedValue(fakeUser)
//     const response = await request(server)
//       .get('/api/v1/users')
//       .set('authorization', `Bearer ${getMockToken()}`)
//     expect(response.status).toBe(200)
//     expect(response.body).toEqual(fakeUser)
//   })

//   it('should return 500 when no access token is passed', async () => {
//     vi.mocked(db.getUser).mockRejectedValue(new Error('test'))
//     const response = await request(server)
//       .get('/api/v1/users')
//       .set('authorization', `Bearer ${getMockToken()}`)
//     expect(response.status).toBe(500)
//     expect(response.body).toEqual({
//       message: 'Unable to insert new user to database',
//     })
//   })
// })

// describe('POST /api/v1/users', () => {
//   it('should return 201 when creating a new profile', async () => {
//     const fakeProfile: Profile = {
//       auth0Id: '123',
//       nickname: 'banana',
//       firstName: 'Ripe',
//       lastName: 'Banana',
//       public: true,
//     }

//     vi.mocked(db.upsertProfile).mockResolvedValue()
//     const response = await request(server)
//       .post('/api/v1/users')
//       .set('authorization', `Bearer ${getMockToken()}`)
//       .send(fakeProfile)
//     expect(response.status).toBe(201)
//   })

//   it('should return 201 when creating a new profile', async () => {
//     const fakeProfile: Profile = {
//       auth0Id: '123',
//       nickname: 'banana',
//       firstName: 'Ripe',
//       lastName: 'Banana',
//       public: true,
//     }

//     vi.mocked(db.upsertProfile).mockResolvedValue()
//     const response = await request(server)
//       .post('/api/v1/users')
//       .set('authorization', `Bearer ${getMockToken()}`)
//       .send(fakeProfile)
//     expect(response.status).toBe(201)
//   })

//   it('should return 400 if the body does not match the zod schemea', async () => {
//     const fakeProfile = {}

//     vi.mocked(db.upsertProfile).mockResolvedValue()
//     const response = await request(server)
//       .post('/api/v1/users')
//       .set('authorization', `Bearer ${getMockToken()}`)
//       .send(fakeProfile)
//     expect(response.status).toBe(400)
//   })

//   it('should return 500 when no access token is passed', async () => {
//     const fakeProfile: Profile = {
//       auth0Id: '123',
//       nickname: 'banana',
//       firstName: 'Ripe',
//       lastName: 'Banana',
//       public: true,
//     }

//     vi.mocked(db.upsertProfile).mockRejectedValue(new Error('test'))
//     const response = await request(server)
//       .post('/api/v1/users')
//       .set('authorization', `Bearer ${getMockToken()}`)
//       .send(fakeProfile)
//     expect(response.status).toBe(500)
//     expect(response.body).toEqual({
//       message: 'Unable to insert new user to database',
//     })
//   })
// })
