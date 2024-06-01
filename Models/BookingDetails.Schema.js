import mongoose, { Schema } from "mongoose";

const BookingDetailsSchema = new mongoose.Schema({
details:[]
    
},{versionKey:false})

const Bookings = mongoose.model('Bookings',BookingDetailsSchema)

export default Bookings;