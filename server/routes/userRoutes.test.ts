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
