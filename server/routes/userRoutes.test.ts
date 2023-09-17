import { vi, describe, it, expect } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/userdb'
import { getMockToken } from './mockToken'
import { User } from '../../types/User'

vi.mock('../db/userdb')

describe('GET /api/v1/users/friends', () => {
  it('should return 200 with an array', async () => {
    const fakeFriends = [
      {
        auth0_id: '123',
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

describe('POST /api/v1/users', () => {
  it('should return 201 when creating a new profile', async () => {
    vi.mocked(db.upsertUser).mockResolvedValue()
    const response = await request(server)
      .post('/api/v1/users/')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send('test-name')
  })
  it('should return 401 when no access token is passed', async () => {
    vi.mocked(db.upsertUser).mockRejectedValue(new Error('test'))
    const fakeData = {}
    const response = await request(server).get('/api/v1/users').send(fakeData)
    expect(response.status).toBe(401)
  })
  it('should return 500 when no access token is passed', async () => {
    vi.mocked(db.upsertUser).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .post('/api/v1/users')
      .set('authorization', `Bearer ${getMockToken()}`)
      .send('IamNeil')
    expect(response.status).toBe(500)
  })
})
