
import { getAbout, updateAbout } from "../controllers/about.controller.js"
import upload from "../middleware/upload.js";

function aboutRoutes(app) {
    app.get("/about", getAbout);
    app.put("/about", upload.single("image"), updateAbout);
}

export default aboutRoutes