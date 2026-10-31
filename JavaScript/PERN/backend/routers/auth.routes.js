import Router from "express-promise-router";
import { profile, signin, signout, signup } from "../controllers/authController.js"
import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middlewares.js";
import { signinSchema,signupSchema } from "../schemas/auth_schemas.js";
const router = Router()

router.post("/signin", validateSchema(signinSchema),signin);

router.post("/signup", validateSchema(signupSchema),signup);

router.post("/signout", signout);

router.get("/profile",isAuth, profile);

export default router;