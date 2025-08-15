import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    images: {
        type: [String],
        default: []
    },
    videos: {
        type: [String],
        default: []
    }
},{ timestamps: true });

const postModel = mongoose.model("Post", postSchema);

export default postModel;