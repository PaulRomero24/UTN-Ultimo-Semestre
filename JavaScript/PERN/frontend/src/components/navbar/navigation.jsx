import {BiTask,MdAddTask,BiUserCircle} from "react-icons"

export const publicRoutes = [

  {
    name: "About",
    path: "/about",
  },
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Register",
    path: "/register",
  },
]

  export const PrivateRoutes =[
     {
    name: "Tareas",
    path: "/tareas",
    icon: <BiTask className="h-5 w-5"/>
  },
  {
    name: "Crear Tarea",
    path: "/tareas/crear",
    icon: <MdAddTask className="h-5 w-5"/>
  },
   {
    name: "Perfil",
    path: "/perfil",
    icon: <BiUserCircle className="h-5 w-5"/>
  },  
];
