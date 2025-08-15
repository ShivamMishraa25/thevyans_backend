import { createPost, getPosts } from "../controllers/post.controller.js";
import upload from "../middleware/upload.js";

function postRoute(app) {
    app.get("/posts", getPosts);
    app.post("/post", upload.array("images"), createPost);
}

export default postRoute;