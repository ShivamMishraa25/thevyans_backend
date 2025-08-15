
import { getAbout, updateAbout } from "../controllers/about.controller.js"
import upload from "../middleware/upload.js";
import auth from "../middleware/auth.js";

function aboutRoutes(app) {
    app.get("/about", getAbout);
    app.put("/about", auth, upload.single("image"), updateAbout);
}

export default aboutRoutes