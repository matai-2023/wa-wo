import express from 'express'
import * as db from '../db/likesdb'
import validateAccessToken from '../auth0'

//api/v1/likes
const router = express.Router()
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
// POST api/v1/likes/---------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
router.post('/', validateAccessToken, async (req, res) => {
  const id = req.auth?.payload.sub
  if (!id) {
    res.status(401).json({ message: 'Please provide an id' })
    return
  }

  try {
    const oid = req.body.outfitId

    await db.addLike(id, Number(oid))
    res.status(200).json({ message: 'liked successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Unable to like' })
  }
})
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//DELETE api/v1/likes/--------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
router.delete('/', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub
  if (!userId) {
    res.status(401).json({ message: 'Please provide an id' })
    return
  }
  try {
    const oid = Number(req.body.outfitId)
    await db.removeLike(userId, oid)
    res.status(200).json({ message: 'deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'could not delete' })
  }
})
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//GET api/v1/likes/outfit/:id-------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
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
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//GET api/v1/likes/check/:outfitId--------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
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
