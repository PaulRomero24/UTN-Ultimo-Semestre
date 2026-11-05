import {email, z} from "zod"

//ESQUEMA PARA VALIDACION
//AUTENTIFICACION USUARIO
export const signupSchema = z.object({
    name: z.string({
        required_error: "El nombre es requerido",
        invalid_type_error:"El nombre debe ser un caracter",
    }).min(1,{
        message: "El nombre debe tener al menos 1 caracter"
    }).max(255,{
        message: "El nombre no puede superar los 255 caracteres"
    }),
    email: z.string({
        required_error: "El email es requerido",
        invalid_type_error:"El email debe ser un caracter",
    }).email({
        message:"El email debe ser un email valido"
    }),
    password: z.string({
        required_error: "La contraseña es requerida",
        invalid_type_error:"La contraseña debe ser un caracter",
    }).min(8,{
        message:"La contraseña debe tener al menos 8 caracteres"
    }).max(15,{
        message: "La contraseña debe tener maximo 15 caracteres"
    })
})

export const signinSchema = z.object({
    
    email: z.string({
        required_error: "El email es requerido",
        invalid_type_error:"El email debe ser un caracter",
    }).email({
        message:"El email debe ser un email valido"
    }),
    password: z.string({
        required_error: "La contraseña es requerida",
        invalid_type_error:"La contraseña debe ser un caracter",
    }).min(8,{
        message:"La contraseña debe tener al menos 8 caracteres"
    }).max(15,{
        message: "La contraseña debe tener maximo 15 caracteres"
    })
})