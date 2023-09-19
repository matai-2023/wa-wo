import express from 'express'
import * as db from '../db/userdb'
import * as data from '../db/wardrobedb'
import validateAccessToken from '../auth0'
import { userSchema } from '../../types/User'
import { Relationship } from '../db/userdb'

const router = express.Router()
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//GET api/v1/users/-----------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
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

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//POST api/v1/users/-----------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

router.post('/', validateAccessToken, async (req, res) => {
  const id = req.auth?.payload.sub
  if (!id) {
    res.status(401).json({ message: 'Please provide an id' })
  }
  try {
    const name = req.body
    const newUser = { auth0_id: id, nickname: name.nickname }
    const realNewUser = userSchema.parse(newUser)
    await db.upsertUser(realNewUser)
    res.status(201)
  } catch (error) {
    res.status(500).json({ message: 'Unable to register this user' })
  }
})
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//GET api/v1/users/friends----------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
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
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//GET api/v1/users/all--------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
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

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//GET api/v1/users/find/:id---------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

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
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//POST api/v1/users/add-------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
router.post('/add', validateAccessToken, async (req, res) => {
  const id = req.auth?.payload.sub
  const friendId = req.body.friend_id
  if (!id) {
    res.status(401).json({ message: 'Please provide an id' })
  }
  try {
    const newFriend = { user_id: id, friend_id: friendId } as Relationship
    await db.addFriend(newFriend)
    res.status(201).json({ message: 'Add friend successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Unable to add this friend' })
  }
})

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//DELETE api/v1/users/delete/:id----------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

router.delete('/delete/:id', validateAccessToken, async (req, res) => {
  const id = req.auth?.payload.sub
  const friendId = req.params.id
  if (!id) {
    res.status(401).json({ message: 'Please provide an id' })
  }
  try {
    const relationship = { user_id: id, friend_id: friendId } as Relationship
    await db.delFriend(relationship)
    res.status(200).json({ message: 'deleted friend successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Unable to deleted this friend' })
  }
})

export default router
