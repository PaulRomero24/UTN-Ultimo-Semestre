import express from "express";
import morgan from "morgan";
import tareasRoutes from "./routers/tareas.routes.js"
import authRoutes from "./routers/auth.routes.js"
import cookieParser from "cookie-parser";


const app = express();
//Middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express,json());
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => res.json({ message: "Bienvenido a mi proyecto" }));
app.use("/api", tareasRoutes)
app.use("/api", authRoutes)


//MANEJO DE ERRORES
app.use((err,req,res,next) => {
    res.status(500).json({
        status: "error",
        message: err.message
    })
})

export default app;