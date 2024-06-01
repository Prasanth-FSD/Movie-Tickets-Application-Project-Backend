import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ConnectDB from './Database/Config.js'
import userRouter from './Routers/User.Router.js'
import movieRouter from './Routers/Movie.Router.js'
import bookingRouter from './Routers/Booking.Router.js'
// import movieRouter from './Routers/Movie.Router.js'

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

const port  = process.env.PORT

ConnectDB()

app.options('*',cors())

app.use('/movieticketapi/user',userRouter)

app.use('/uploadapi/admin',movieRouter)

app.use("/bookings",bookingRouter)

app.listen(port,()=>{
    console.log(`App is Running on port-${port}`);
})
