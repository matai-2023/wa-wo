import express from 'express'
import validateAccessToken from '../auth0.ts'
import logger from '../db/logger.ts'
import checkJwt from '../auth0.ts'
import * as db from '../db/wardrobedb.ts'
// import { auth } from 'express-oauth2-jwt-bearer'

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
    const mySongs = await db.getAllwardrobe(userId)
    res.json(mySongs)
  } catch (e) {
    logger.error(e)
    res.status(500).json({ message: 'Unable to retrieve songs' })
  }
})

// TODO: use checkJwt as middleware
// POST /api/v1/fruits
// router.post('/', (req: JwtRequest, res) => {
//   const { fruit } = req.body
//   const auth0Id = req.auth?.sub

//   if (!auth0Id) {
//     console.error('No auth0Id')
//     return res.status(401).send('Unauthorized')
//   }

//   const newFruit: FruitSnakeCase = {
//     added_by_user: auth0Id,
//     name: fruit.name,
//     average_grams_each: fruit.averageGramsEach,
//   }

//   addFruit(newFruit)
//     .then(() => getFruits())
//     .then((fruits: Fruit[]) => res.json({ fruits }))
//     .catch((err: Error) => {
//       console.error(err)
//       res.status(500).send('Something went wrong')
//     })
// })

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
// DELETE /api/v1/fruits
// router.delete('/:id', (req: JwtRequest, res) => {
//   const id = Number(req.params.id)
//   const auth0Id = req.auth?.sub

//   if (!auth0Id) {
//     console.error('No auth0Id')
//     return res.status(401).send('Unauthorized')
//   }

//   userCanEdit(id, auth0Id)
//     .then(() => deleteFruit(id))
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

export default router
