import express from 'express'
import { getAllBookings, updateBooking } from '../Controllers/Bookings.controller.js'


const bookingRouter = express.Router()

bookingRouter.get('/getAllBookings',getAllBookings)
bookingRouter.post('/updateBookings',updateBooking)

export default bookingRouter;