import request from 'superagent'
import { User } from '../../types/User'
import { AddWardrobe, Wardrobe } from '../../types/MyWardrobe'
import { OutfitToAdd } from '../../server/db/outfits'
import { as } from 'vitest/dist/reporters-cb94c88b.js'

//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------
//ALL User api calls go here
//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------
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

export async function getAllUsers(token: string) {
  const res = await request
    .get('/api/v1/users/all')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  return res.body as User[]
}

export async function getFriendList(token: string) {
  const res = await request
    .get('/api/v1/users/friends')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  return res.body as User[]
}

export async function addNewProfile(nickname: string, token: string) {
  await request
    .post('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(nickname)
}

export async function addFriend(friendId: string, token: string) {
  await request
    .post('/api/v1/users/add')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ friend_id: friendId })
}

export async function delFriend(friendId: string, token: string) {
  await request
    .delete(`/api/v1/users/delete/${friendId}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
}

//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------
//ALL Wardrobe api calls go here
//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------

export async function getMyWardrobe(token: string) {
  const response = await request
    .get('/api/v1/my-wardrobe')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  return response.body as Wardrobe[]
}

export async function addItem(newItem: FormData, token: string) {
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

export async function getFriendsWardrobe(id: string, token: string) {
  const res = await request
    .get(`/api/v1/users/find/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  return res.body
}

//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------
//ALL Outfit and comment api calls go here-------
//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------

export async function getAllOutfits(token: string) {
  const res = await request
    .get(`/api/v1/outfits/all`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  return res.body
}

export async function getOutfitById(userId: string, token: string) {
  const res = await request
    .get(`/api/v1/outfits/all/${userId}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  return res.body
}

export async function getCommentsOfOutfit(outfitId: number, token: string) {
  const res = await request
    .get(`/api/v1/outfits/comments/${outfitId}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  return res.body
}

export async function addOutfit(newOutfit: FormData, token: string) {
  await request
    .post(`/api/v1/outfits`)
    .set('Authorization', `Bearer ${token}`)
    .send(newOutfit)
}

export async function addAComments({
  comment,
  outfitId,
  token,
}: {
  comment: string
  outfitId: number
  token: string
}) {
  await request
    .post(`/api/v1/outfits/comment`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ outfitId: outfitId, comment: comment })
}

export async function deleteAComment(id: number, token: string) {
  await request
    .delete(`/api/v1/outfits/comments/delete`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ id })
}
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//All like api calls go here------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//     /api/v1/likes/:outfitId
export async function addLike({
  outfitId,
  token,
}: {
  outfitId: number
  token: string
}) {
  await request
    .post(`/api/v1/likes`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ outfitId })
}
//    /api/v1/likes/:outfitId
export async function removeLike({
  outfitId,
  token,
}: {
  outfitId: number
  token: string
}) {
  await request
    .delete(`/api/v1/likes`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ outfitId })
}
//     /api/v1/likes/:outfitId
export async function checkLike(outfitId: number, token: string) {
  const res = await request
    .get(`/api/v1/likes/check/${outfitId}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  return res.body
}
//  /api/v1/likes/outfit/:outfitId
export async function displayLikeCount(outfitId: number, token: string) {
  const res = await request
    .get(`/api/v1/likes/${outfitId}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  return res.body
}
