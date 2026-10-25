import { useEffect,useState } from "react"
import { obtenerTareasRequest } from "../api/tareas.api"
import { response } from "express"
import {Card, CardTareas} from "../components/ui"

function TareasPage() {
  const [tareas,setTareas] = useState()

  useEffect(()=> {
    obtenerTareasRequest().then((response)=>{
      setTareas(response.data)
    })
  }, [])

  return ( 
      <div className="grid grid-cols-3 gap-2">
      {
        tareas.map((tarea)=>(
          <CardTareas key={tarea.id} tarea={tarea}></CardTareas>
        ))
      }
    </div>)
  
}

export default TareasPage