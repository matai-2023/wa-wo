import * as Path from 'node:path'
import express from 'express'
import outfitRoute from './routes/outfitRoute.ts'
import wawoRoutes from './routes/wardrobeRoutes.ts'
import userRoutes from './routes/usersRoutes.ts'
import likesRoutes from './routes/likesRoutes.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/my-wardrobe', wawoRoutes)
server.use('/api/v1/users', userRoutes)
server.use('/api/v1/outfits', outfitRoute)
server.use('/api/v1/likes', likesRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
