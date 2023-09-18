import express from 'express'
import validateAccessToken from '../auth0.ts'
import logger from '../db/logger.ts'
import * as db from '../db/wardrobedb.ts'
import { addItemSchema } from '../../types/MyWardrobe.ts'
import upload from '../multerSetup.ts'

const router = express.Router()

// GET /api/v1/my-wardrobe
router.get('/', validateAccessToken, async (req, res) => {
  try {
    const userId = req.auth?.payload.sub
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    const myItems = await db.getAllwardrobe(userId)
    res.json(myItems)
  } catch (e) {
    res.status(500).json({ message: 'Unable to retrieve items 👕👖👟' })
  }
})

// POST /api/v1/my-wardrobe
router.post(
  '/',
  upload.single('image'),
  validateAccessToken,
  async (req, res) => {
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
        image: `/images/${req.file?.filename}`,
      }
      await db.addItem(newItem)
      res.status(201)
    } catch (e) {
      logger.error(e)
      res.status(500).json({ message: 'Unable to add items' })
    }
  }
)

// DELETE /api/v1/my-wardrobe
router.delete('/:id', validateAccessToken, async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteItem(id)
    res.sendStatus(200)
  } catch (e) {
    res.status(500).json({ message: 'Unable to delete item' })
  }
})

export default router
