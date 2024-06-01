import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
   image:String
},{versionKey:false})

const CarouselImage = mongoose.model('CarouselImage',ImageSchema)

export default CarouselImage;