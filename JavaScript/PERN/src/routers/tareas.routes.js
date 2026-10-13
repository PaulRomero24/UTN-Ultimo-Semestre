import { Router } from "express-promise-router";
import { actualizarTarea, crearTarea, eliminarTarea, listarTarea } from "../controllers/tareasController.js"
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/tareas",isAuth, listarTareas);

router.get("/tareas/:id",isAuth, listarTarea) 

router.post("/tareas",isAuth, crearTarea)

router.put("/tareas/:id",isAuth, actualizarTarea)

router.delete("/tareas/:id",isAuth, eliminarTarea)

export default app;