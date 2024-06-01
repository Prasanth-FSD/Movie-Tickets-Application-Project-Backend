import express from 'express'
import { AllUsers, LoginUser, RegisterUser, ResetPassword, forgotPassword, handleBooking, handleLogout } from '../Controllers/User.controller.js'

const userRouter = express.Router()

userRouter.post('/register',RegisterUser)
userRouter.post('/login',LoginUser)
userRouter.get('/alluserslist',AllUsers)
userRouter.post('/forgotpassword',forgotPassword)
userRouter.put('/resetpassword',ResetPassword)
userRouter.get('/logout',handleLogout)
userRouter.post("/bookMovie",handleBooking)

export default userRouter;