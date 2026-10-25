import axios from "axios";

export const crearTareaRequest = (tarea) => axios.post("/tareas",tarea)

export const obtenerTareasRequest =() => axios.get("/tareas")

export const eliminarTareaRequqest = (id) => axios.delete(`/tareas/${id}`)