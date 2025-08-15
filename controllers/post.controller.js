import postModel from "../models/post.model.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function getPosts (req, res) {
    try {
        const posts = await postModel.find({});
        if(!posts) {
            return res.status(404).json({ message: "posts not found" });
        }
        return res.status(200).json(posts);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function createPost (req, res) {
    try {
        const { title, date, author, content } = req.body;
        let videos = req.body.videos;
        if (!Array.isArray(videos)) {
            videos = videos ? [videos] : [];
        }
        // Handle images
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.v2.uploader.upload(file.path, {
                    folder: "posts"
                });
                imageUrls.push(result.secure_url);
            }
        }
        const post = await postModel.create({
            title,
            date,
            author,
            content,
            images: imageUrls,
            videos
        });
        return res.status(201).json(post);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Server Error" });
    }
}