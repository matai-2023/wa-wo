import request from 'superagent'
import { User } from '../../types/User'
import { AddWardrobe, Wardrobe } from '../../types/MyWardrobe'

export async function addProfile({
  nickname,
  token,
}: {
  nickname: string
  token: string
}) {
  return await request
    .post('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ nickname: nickname })
}

export async function getUser(token: string) {
  const res = await request
    .get('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  return res.body
}

export async function getFriendList(token: string) {
  const res = await request
    .get('/api/v1/users/friends')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  return res.body as User[]
}

export async function getMyWardrobe(token: string) {
  const response = await request
    .get('/api/v1/my-wardrobe')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  return response.body as Wardrobe[]
}

export async function addItem(newItem: AddWardrobe, token: string) {
  await request
    .post('/api/v1/my-wardrobe')
    .set('Authorization', `Bearer ${token}`)
    .send(newItem)
}

export async function delItem(id: number, token: string) {
  await request
    .del(`/api/v1/my-wardrobe/${id}`)
    .set('Authorization', `Bearer ${token}`)
}

export async function getFriendsWardrobe(id: string, token:string){
  const res = await request
  .get(`/api/v1/users/find/${id}`)
  .set('Authorization', `Bearer ${token}`)
  .set('Content-Type', 'application/json')
return res.body
}

