import express from 'express'
import * as db from '../db/userdb'

import validateAccessToken from '../auth0'

const router = express.Router()

// GET /api/v1/users
// router.get('/', validateAccessToken, async (req: JwtRequest, res) => {
//   const auth0Id = req.auth?.payload.sub
//   const form = req.body

//   if (!auth0Id) {
//     res.status(400).json({ message: 'Missing auth0 id'})
//     return
//   }
//   if (!form) {
//     res.status(400).json({message: 'Please provide a form'})
//     return
//   }
// try {

// } catch (error) {

// }
// })

router.get('/friends', validateAccessToken, async (req, res) => {
  const id = req.auth?.payload.sub
  if (!id) {
    res.status(401).json({ message: 'Please provide an id' })
    return
  }

  try {
    const friends = await db.getFriends(id)
    res.status(200).json(friends)
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve friends' })
  }
})

export default router
