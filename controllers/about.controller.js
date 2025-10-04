import aboutModel from "../models/about.model.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function getAbout (req, res) {
    try {
        const about = await aboutModel.findOne({});
        if(!about) {
            return res.status(404).json({ message: "about not found" });
        }
        return res.status(200).json(about);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function updateAbout(req, res) {
    try {
        let imageUrl;
        // If image is sent as a file (multipart/form-data)
        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "about"
            });
            imageUrl = result.secure_url;
        } else if (req.body.image) {
            // If image is sent as a base64 string
            if (req.body.image.startsWith("data:")) {
                const result = await cloudinary.v2.uploader.upload(req.body.image, {
                    folder: "about"
                });
                imageUrl = result.secure_url;
            } else {
                // If image is a URL, keep as is
                imageUrl = req.body.image;
            }
        }

        const updateData = {
            ...req.body,
            ...(imageUrl ? { image: imageUrl } : {})
        };
        const updatedAbout = await aboutModel.findOneAndUpdate({}, updateData, { new: true });
        if (!updatedAbout) {
            return res.status(404).json({ message: "About document not found" });
        }
        return res.status(200).json(updatedAbout);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function createAbout(req, res) {
    try {
        const about = await aboutModel.create(req.body);
        if(!about) return res.status(404).json({ message: "about not created" });
        return res.status(200).json(about);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Server Error" });
    }
}