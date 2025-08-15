import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminModel from "../models/admin.model.js";

export async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await adminModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        // Use async bcrypt.compare()
        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
            return res.status(401).json({ message: "wrong password" });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function register(req, res) {
    try {
        const { username, password } = req.body;
        
        // Add a check for an existing user to prevent errors
        const existingUser = await adminModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        // Use await with bcrypt.hash()
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await adminModel.create({ username, password: hashedPassword });
        
        return res.status(201).json(user);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "server error" });
    }
}