import express from 'express'
import validateAccessToken from '../auth0'

const router = express.Router()

// GET /api/v1/users
router.get('/', validateAccessToken, async (req, res) => {
  const auth0Id = req.auth?.payload.sub
  const form = req.body

  if (!auth0Id) {
    res.status(400).json({ message: 'Missing auth0 id'})
    return
  }
  if (!form) {
    res.status(400).json({message: 'Please provide a form'})
    return
  }
try {
  const user = 
} catch (error) {
  
}
})

export default router