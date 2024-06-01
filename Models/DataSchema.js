import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    data:Array
})
const data = mongoose.model("Data", dataSchema)
export default data