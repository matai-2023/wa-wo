import { vi, describe, it, expect } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/wardrobedb'
import { getMockToken } from './mockToken'
import { Wardrobe } from '../../types/MyWardrobe'

vi.mock('../db/wardrobedb')

describe('GET /api/v1/my-wardrobe', () => {
  it('1. Should return 200 with an empty array if theres no clothes in the user wardrobe', async () => {
    vi.mocked(db.getAllwardrobe).mockResolvedValue([] as Wardrobe[])
    const response = await request(server)
      .get('/api/v1/my-wardrobe')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  it('2. Should return 200 with a item', async () => {
    const fakeItem: Wardrobe[] = [
      {
        id: 2,
        user_id: '123',
        name: 'test-nickname',
        description: 'Ryan',
        category: 'Ng',
        part: 'top',
        image: 'ur',
      },
    ]

    vi.mocked(db.getAllwardrobe).mockResolvedValue(fakeItem)
    const response = await request(server)
      .get('/api/v1/my-wardrobe')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(fakeItem)
  })

  it('3. Should return 500 when no access token is passed', async () => {
    vi.mocked(db.getAllwardrobe).mockRejectedValue(new Error('test'))
    const response = await request(server)
      .get('/api/v1/my-wardrobe')
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      message: 'Unable to retrieve items 👕👖👟',
    })
  })

  it('4. should return 401 with an error if theres no token passed', async () => {
    const response = await request(server).get('/api/v1/my-wardrobe')
    expect(response.status).toBe(401)
  })
})
