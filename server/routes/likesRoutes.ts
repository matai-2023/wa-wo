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
    const oid = req.params.id
    await db.addLike(id, Number(oid))
    res.status(200).json({ message: 'liked successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Unable to like' })
  }
})

router.delete('/:id', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub
  if (!userId) {
    res.status(401).json({ message: 'Please provide an id' })
    return
  }
  try {
    const oid = Number(req.params.id)
    await db.removeLike(userId, oid)
    res.status(200).json({ message: 'deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'could not delete' })
  }
})

router.get('/outfit/:id', validateAccessToken, async (req, res) => {
  const id = req.auth?.payload.sub
  if (!id) {
    res.status(401).json({ message: 'Please provide an id' })
    return
  }
  try {
    const oid = Number(req.params.id)
    const count = await db.countLikes(oid)
    res.status(200).json(count)
  } catch (error) {
    res.status(500).json({ message: 'could not get count' })
  }
})

router.get('/check/:outfitId', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub as string
  if (!userId) {
    res.status(401).json({ message: 'Please provide an id' })
  }
  try {
    const oid = Number(req.params.outfitId)
    const check = await db.checkLikes(userId, oid)
    res.status(200).json({ check })
  } catch (error) {
    res.status(500).json({ message: 'could not get count' })
  }
})

export default router
