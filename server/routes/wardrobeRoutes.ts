import express from 'express'
import validateAccessToken from '../auth0.ts'
import * as db from '../db/wardrobedb.ts'

const router = express.Router()

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//GET api/v1/my-wardrobe/-----------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
router.get('/', validateAccessToken, async (req, res) => {
  try {
    const userId = req.auth?.payload.sub
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    const myItems = await db.getAllwardrobe(userId)
    res.json(myItems.reverse())
  } catch (e) {
    res.status(500).json({ message: 'Unable to retrieve items 👕👖👟' })
  }
})

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//POST api/v1/my-wardrobe/----------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
router.post('/', validateAccessToken, async (req, res) => {
  const userId = req.auth?.payload.sub
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  try {
    const newItem = {
      user_id: userId,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      part: req.body.part,
      image: req.body.image,
      public_id: req.body.public_id,
    }
    await db.addItem(newItem)
    res.status(201).json({ message: 'Added successfully' })
  } catch (e) {
    console.error('Errors: ', e)
    res.status(500).json({ message: 'Unable to add items' })
  }
})

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//DELETE api/v1/my-wardrobe/:id-----------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
router.delete('/:id', validateAccessToken, async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteItem(id)
    res.status(200).json({ message: 'deleted successfully' })
  } catch (e) {
    res.status(500).json({ message: 'Unable to delete item' })
  }
})

export default router
