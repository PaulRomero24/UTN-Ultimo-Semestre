import { useEffect,useState } from "react"
import {CardTareas} from "../components/ui"
import { useTareas } from "../context/TareasContext"

function TareasPage() {
  const [tareas,cargarTareas] = useState()

  useEffect(()=> {
    cargarTareas();
    },[])

  if (tareas.length === 0){
    return (
      <div className="flex justify-center items-center h-[calc(100vh - 10rem)]">
        <h1 className="text-3xl font-bold">No hay Tareas</h1>
      </div>
    )
  }
  

  return ( 
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      {
        tareas.map((tarea)=>(
          <CardTareas key={tarea.id} tarea={tarea}></CardTareas>
        ))
      }
    </div>)
  
}

export default TareasPage