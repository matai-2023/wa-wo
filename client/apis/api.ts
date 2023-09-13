import request from "superagent"
import { User } from "../../types/User"
export async function addProfile({nickname,token}:{nickname: string, token: string}) {
    return await request
    .post('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json').send({ nickname: nickname })
  }
 
  
  export async function getUser(token: string){
    const res = await request
    .get('/api/v1/user')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    return res.body as User
  }