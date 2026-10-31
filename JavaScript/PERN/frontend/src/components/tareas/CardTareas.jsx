import { Card, Button } from "../ui";
import { useTareas } from "../../context/TareasContext";
import { useNavigate } from "react-router-dom";
import { piTrashSimpleLight, PiPencil } from "react-icons/pi";

export function CardTareas(tarea) {
  const { eliminarTarea } = useTareas();
  const navigate = useNavigate();

  return (
    <Card key={tarea.id} className="py-4 px-7 justify-center flex flex-col">
      <div>
        <h1 className="text-2xl font-bold">{tarea.titulo}</h1>
        <p className="py-4">{tarea.descripcion}</p>
      </div>
      <div className="flex justify-end gap-x-2">
        <Button onClick={() => navigate(`/tareas/${tarea.id}/editar`)}>
          <piPencil className="text-white" />
          editar
        </Button>

        <Button
          className="bg-red-500 hover:bg-red-700"
          onClick={async () => {
            if (window.confirm("¿Estas seguro de eliminar la tarea?")) {
              await eliminarTarea(tarea.id);
            }
          }}
        >
          <piTrashSimpleLight className="text-white" />
          Eliminar
        </Button>
      </div>
    </Card>
  );
}

export default CardTareas;
