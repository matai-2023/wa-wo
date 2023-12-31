import request from 'superagent'
import { User } from '../../types/User'
import { Wardrobe } from '../../types/MyWardrobe'

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
  const newData = new FormData()
  const file = newItem.get('image')
  newData.append('file', file as File)
  newData.append('upload_preset', 'my-uploads')
  const response = await fetch(
    'https://api.cloudinary.com/v1_1/neil2023/image/upload',
    { method: 'POST', body: newData }
  )
  const cloudData = await response.json()
  console.log(cloudData)
  const name = newItem.get('name')?.valueOf() as string
  const description = newItem.get('description')?.valueOf() as string
  const part = newItem.get('part')?.valueOf() as string
  const category = newItem.get('category')?.valueOf() as string
  const dataToAdd = {
    name,
    description,
    part,
    category,
    image: cloudData.secure_url,
    public_id: cloudData.public_id,
  }
  await request
    .post('/api/v1/my-wardrobe')
    .set('Authorization', `Bearer ${token}`)
    .send(dataToAdd)
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
  const newData = new FormData()
  const file = newOutfit.get('image')
  newData.append('file', file as File)
  newData.append('upload_preset', 'my-uploads')
  const response = await fetch(
    'https://api.cloudinary.com/v1_1/neil2023/image/upload',
    { method: 'POST', body: newData }
  )
  const cloudData = await response.json()
  const top = newOutfit.get('top')?.valueOf() as string
  const bottom = newOutfit.get('bottom')?.valueOf() as string
  const outer = newOutfit.get('outer')?.valueOf() as string
  const acc = newOutfit.get('accessories')?.valueOf() as string
  const footwear = newOutfit.get('footwear')?.valueOf() as string
  const description = newOutfit.get('description')?.valueOf() as string
  const dataToAdd = {
    top,
    bottom,
    outer,
    acc,
    footwear,
    description,
    image: cloudData.secure_url,
    public_id: cloudData.public_id,
  }
  await request
    .post(`/api/v1/outfits`)
    .set('Authorization', `Bearer ${token}`)
    .send(dataToAdd)
}

export async function deleteOutfit(id: number, token: string) {
  await request
    .delete(`/api/v1/outfits/delete/${id}`)
    .set('Authorization', `Bearer ${token}`)
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
