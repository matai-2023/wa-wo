import express from 'express'
import validateAccessToken from '../auth0.ts'
import logger from '../db/logger.ts'
import * as db from '../db/wardrobedb.ts'
import { addItemSchema } from '../../types/MyWardrobe.ts'
import upload from '../multerSetup.ts'
import { v2 as cloudinary } from 'cloudinary'
import * as Path from 'node:path/posix'
import * as URL from 'node:url'
import path from 'node:path/posix'

const router = express.Router()

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)
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
      const filePath = path.join(
        __dirname,
        '../../public',
        `/images/${req.file?.filename}`
      )
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'images',
        resource_type: 'image', // Change as needed (auto, image, video, raw, etc.)
      })

      const newItem = {
        user_id: userId,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        part: req.body.part,
        image: result.secure_url,
        public_id: result.public_id,
      }
      await db.deleteWardrobeImages(`images/${req.file?.filename}`)
      await db.addItem(newItem)
      res.status(201).json({ message: 'Added successfully' })
    } catch (e) {
      logger.error(e)
      res.status(500).json({ message: 'Unable to add items' })
    }
  }
)

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
