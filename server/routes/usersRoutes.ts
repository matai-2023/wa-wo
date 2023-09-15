import express from 'express'
import * as db from '../db/userdb'
import * as data from '../db/wardrobedb'
import validateAccessToken from '../auth0'

const router = express.Router()

router.get('/', validateAccessToken, async (req, res) => {
  const id = req.auth?.payload.sub
  if (!id) {
    res.status(401).json({ message: 'Please provide an id' })
    return
  }

  try {
    const user = await db.getUser(id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve friends' })
  }
})

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

router.get('/all', validateAccessToken, async (req, res) => {
  const id = req.auth?.payload.sub
  if (!id) {
    res.status(401).json({ message: 'Please provide an id' })
    return
  }

  try {
    const users = await db.getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve friends' })
  }
})

router.get('/find/:id', validateAccessToken, async (req, res) => {
  const id = req.auth?.payload.sub
  if (!id) {
    res.status(401).json({ message: 'Please provide an id' })
    return
  }
  try {
    const friendId = req.params.id
    const friendwr = await data.getAllwardrobe(friendId)
    const friendsNick = await db.getUser(friendId)
    res.status(200).json({ nickname: friendsNick, robes: friendwr })
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve friends' })
  }
})

export default router
