import express from 'express'
import * as db from '../db/likesdb'
import validateAccessToken from '../auth0'

const router = express.Router()

router.post('/:id', validateAccessToken, async (req, res) => {
  const id = req.auth?.payload.sub
  if (!id) {
    res.status(401).json({ message: 'Please provide an id' })
    return
  }

  try {
    let oid = req.params.id
    await db.addLike(id, Number(oid))
    // await db.addLike({ user_id: id, outfit_id: Number(outfit_id) })
    res.status(200).json({ message: 'liked successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Unable to like' })
  }
})

export default router
