import { login, register } from "../controllers/admin.controller.js";

function adminRoutes(app) {
    app.post("/login", login);
    // app.post("/register", register);
}

export default adminRoutes;