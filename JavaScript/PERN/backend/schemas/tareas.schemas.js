import {z} from "zod"

//ESQUEMA PARA VALIDACION
//CREAR TAREA
export const createTareaSchema = z.object({
    titulo: z.string({
        required_error: "El titulo es requerido",
        invalid_type_error:"El titulo debe ser un caracter",
    }).min(1,{
        message: "El titulo debe tener al menos 1 caracter"
    }).max(255,{
        message: "El titulo no puede superar los 255 caracteres"
    }),
    descripcion: z.string({
         required_error: "El titulo es requerido",
        invalid_type_error:"El titulo debe ser un caracter",
    }).min(0,{
         message: "La descripcion debe tener al menos 1 caracter"
    }).max(255,{
        message: "La descripcion no puede superar los 255 caracteres"
    }).optional(),
})

//ACTUALIZAR TAREA
export const updateTareaSchema = z.object({
    titulo: z.string({
        required_error: "El titulo es requerido",
        invalid_type_error:"El titulo debe ser un caracter",
    }).min(1,{
        message: "El titulo debe tener al menos 1 caracter"
    }).max(255,{
        message: "El titulo no puede superar los 255 caracteres"
    }).optional(),
    descripcion: z.string({
         required_error: "El titulo es requerido",
        invalid_type_error:"El titulo debe ser un caracter",
    }).min(0,{
         message: "La descripcion debe tener al menos 1 caracter"
    }).max(255,{
        message: "La descripcion no puede superar los 255 caracteres"
    }).optional(),
})