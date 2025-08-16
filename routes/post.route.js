import { createPost, deletePost, getPosts } from "../controllers/post.controller.js";
import upload from "../middleware/upload.js";
import auth from "../middleware/auth.js";

function postRoute(app) {
    app.get("/posts", getPosts);
    app.post("/post", auth, upload.array("images"), createPost);
    app.delete("/posts/:id", auth, deletePost);
}

export default postRoute;