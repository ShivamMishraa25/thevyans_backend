import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    image: String,
    englishContent: String,
    hindiContent: String 
})

const aboutModel = mongoose.model("About", aboutSchema);

export default aboutModel;