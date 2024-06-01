import mongoose from "mongoose";

const BookedMovieSchema = new mongoose.Schema({
   movieName:String,
   theaterName:String,
   date:String,
   timing:String,
   seatNumber:Array
})


const UserSchema  = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    token:String,
    role:{
        type:String,
        default:"User"
    },
    bookedMovies: {
        type: Object,
        default:{totalMovies:0}
    }
},{versionKey:false})

const User = mongoose.model('User',UserSchema)

export default User;