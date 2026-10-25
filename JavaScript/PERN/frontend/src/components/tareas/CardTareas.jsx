import {Card, Button } from "../ui";
import { eliminarTareaRequqest } from "../../api/tareas.api";


export function CardTareas(tarea) {
  return (
    <Card key={tarea.id} className="py-4 px-7">
        <div>
      <h1 className="text-2xl font-bold">{tarea.titulo}</h1>
      <p>{tarea.descripcion}</p>
      </div>
      <div className="flex justify-end gap-x-2">
        <Button>Guardar</Button>
        <Button className="bg-red-500 hover:bg-red-700"
        onClick={async() => {
            if(window.confirm("¿Estas seguro de eliminar la tarea?")){
                const res = await eliminarTareaRequqest(tarea.id)
                console.log(res)
            }
        }}>Eliminar</Button>
      </div>
    </Card>
  );
}

export default CardTareas;
