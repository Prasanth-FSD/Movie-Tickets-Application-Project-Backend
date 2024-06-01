import mongoose from "mongoose";

const TheaterSchema =  new mongoose.Schema({
    theatername:{
        type:String,
    },
    theateramenties:[{
        type:String,
    }],
    screentimings:[{
        type:String
    }]
})

const MovieSchema = new mongoose.Schema({
    movietitle:String,
    image:String,
    censor:String,
    duration:String,
    language:String,
    genre:String,
    theater:[TheaterSchema]
    
},{versionKey:false})

const Movie = mongoose.model('Movie',MovieSchema)

export default Movie;