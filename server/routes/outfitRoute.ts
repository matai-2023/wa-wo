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
    res.status(200).json(allOutfits.reverse())
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve outfits' })
  }
})

//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//GET /api/v1/outfits/comments/:id-------------------------
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
//GET /api/v1/outfits/all/:id--------------------------------------
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
    const newOutfit = {
      top_id: req.body.top.length == 0 ? null : Number(req.body.top),
      bottom_id: req.body.bottom.length == 0 ? null : Number(req.body.bottom),
      outer_id: req.body.outer.length == 0 ? null : Number(req.body.outer),
      accessories_id:
        req.body.acc.length == 0 ? null : Number(req.body.accessories),
      footwear_id:
        req.body.footwear.length == 0 ? null : Number(req.body.footwear),
      description: req.body.description,
      img: req.body.image,
      public_id: req.body.public_id,
    }
    await db.addOutfit(userId, newOutfit)
    res.status(201).json({ message: 'Added successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Unable to add outfit' })
  }
})
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//POST /api/v1/outfits/comment------------------------------
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
    res.status(500).json({ message: 'Unable to add outfit' })
  }
})
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//DELETE /api/v1/outfits/comments/delete----------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
router.delete('/comments/delete', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub
  if (!userId) {
    res.status(401).json({ message: 'Please provide an id' })
    return
  }
  try {
    const commentId = Number(req.body.id)
    await db.removeComment(commentId)
    res.status(200).json({ message: 'deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'could not delete' })
  }
})

//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//GET /api/v1/outfits/delete-------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------

router.delete('/delete/:id', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub
  if (!userId) {
    res.status(401).json({ message: 'Please provide an id' })
    return
  }
  try {
    const id = Number(req.params.id)
    await db.removeOutfit(id)
    res.status(200).json({ message: 'deleted successfully' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Unable to delete item' })
  }
})
export default router
