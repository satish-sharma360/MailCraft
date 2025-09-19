import express from 'express'
import authController from '../controllers/auth.controller.js'

const userRouter = express.Router()

userRouter.post('/signup',authController.signup)
userRouter.post('/login',authController.login)
userRouter.post('/refresh-token',authController.refreshToken)

export default userRouter