import { auth } from 'express-oauth2-jwt-bearer'
import dotenv from 'dotenv'

dotenv.config()

const authConfig = {
  issuerBaseURL: `https://${process.env.VITE_AUTH0_DOMAIN}/`,
  audience: process.env.VITE_AUTH0_AUDIENCE,
}

const validateAccessToken = auth(authConfig)
export default validateAccessToken
