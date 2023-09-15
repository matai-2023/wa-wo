import express from 'express'
import validateAccessToken from '../auth0.ts'
import logger from '../db/logger.ts'
import * as db from '../db/wardrobedb.ts'
import { addItemSchema } from '../../types/MyWardrobe.ts'

const router = express.Router()

// A public endpoint that anyone can access
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
    logger.error(e)
    res.status(500).json({ message: 'Unable to retrieve items 👕👖👟' })
  }
})

// TODO: use checkJwt as middleware
// POST /api/v1/my-wardrobe
router.post('/', validateAccessToken, async (req, res) => {
  try {
    const auth0Id = req.auth?.payload.sub
    const input = req.body
    if (!auth0Id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    console.log(req.body)
    const newItem = addItemSchema.parse(input)
    await db.addItem(newItem)
    res.sendStatus(201)
  } catch (e) {
    logger.error(e)
    res.status(500).json({ message: 'Unable to add items' })
  }
})

// TODO: use checkJwt as middleware
// PUT /api/v1/fruits
// router.put('/', (req: JwtRequest, res) => {
//   const { fruit } = req.body
//   const auth0Id = req.auth?.sub
//   const fruitToUpdate = {
//     id: fruit.id,
//     added_by_user: auth0Id,
//     name: fruit.name,
//     average_grams_each: fruit.averageGramsEach,
//   }

//   if (!auth0Id) {
//     console.error('No auth0Id')
//     return res.status(401).send('Unauthorized')
//   }

//   userCanEdit(fruit.id, auth0Id)
//     .then(() => updateFruit(fruitToUpdate as FruitSnakeCase))
//     .then(() => getFruits())
//     .then((fruits: Fruit[]) => res.json({ fruits }))
//     .catch((err: Error) => {
//       console.error(err)
//       if (err.message === 'Unauthorized') {
//         res
//           .status(403)
//           .send('Unauthorized: Only the user who added the fruit may update it')
//       } else {
//         res.status(500).send('Something went wrong')
//       }
//     })
// })

// TODO: use checkJwt as middleware
// DELETE /api/v1/my-wardrobe
router.delete('/:id', validateAccessToken, async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteItem(id)
    res.sendStatus(200)
  } catch (e) {
    logger.error(e)
    res.status(500).json({ message: 'Unable to delete item' })
  }
})

export default router
