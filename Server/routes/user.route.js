import express from 'express'
import authController from '../controllers/auth.controller.js'
import templateController from '../controllers/template.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

const userRouter = express.Router()

userRouter.post('/signup',authController.signup)
userRouter.post('/login',authController.login)
userRouter.post('/refresh-token',authController.refreshToken)
userRouter.post('/createTamplet',authMiddleware,templateController.createTemplate)
userRouter.get('/get-current-user',authMiddleware,authController.getUser)

export default userRouter