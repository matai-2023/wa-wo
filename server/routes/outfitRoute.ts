import express from 'express'
import * as db from '../db/outfits'
import validateAccessToken from '../auth0'

const router = express.Router()

//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//GET /api/v1/outfits/all----------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
router.get('/all', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub
  if (!userId) {
    res.status(401).json({ message: 'Please provide an id' })
    return
  }

  try {
    const allOutfits = await db.getAllOutfits()
    res.status(200).json(allOutfits)
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve outfits' })
  }
})

//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//GET /api/v1/outfits/:id----------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
router.get('/comments/:id', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub
  if (!userId) {
    res.status(401).json({ message: 'Please provide an id' })
    return
  }

  try {
    const outfitId = req.params.id
    const comments = await db.getComments(Number(outfitId))
    res.status(200).json(comments)
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve outfits' })
  }
})
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//GET /api/v1/outfits--------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------

router.get('/all/:id', validateAccessToken, async (req, res) => {
  const id = req.auth?.payload.sub
  if (!id) {
    res.status(401).json({ message: 'Please provide an id' })
    return
  }

  try {
    const user_id = req.params.id
    const outfits = await db.getOutfitsByUserId(user_id)
    res.status(200).json(outfits)
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve outfits' })
  }
})

//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//POST /api/v1/outfits-------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------

router.post('/', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub
  if (!userId) {
    res.status(401).json({ message: 'Please provide an id' })
    return
  }
  try {
    const outfitUrl = req.body
    await db.addOutfit(userId, outfitUrl)
    res.status(201).json({ message: 'Add successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Unable to add outfit' })
  }
})
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//GET /api/v1/outfits/comment------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
router.post('/comment', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub
  if (!userId) {
    res.status(401).json({ message: 'Please provide an id' })
    return
  }
  try {
    const newComment = req.body
    await db.addComment(userId, newComment)
    res.status(201).json({ message: 'Add successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Unable to add outfit' })
  }
})
export default router
