import { Button, Card, Input, Label, TextArea } from "../components/ui";
import { useForm } from "react-hook-form";
import { useTareas } from "../context/TareasContext";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


function TareaFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const params = useParams();
  const navigate = useNavigate();
  const {
    crearTarea,
    cargarTarea,
    editarTarea,
    errors: tareasErrors,
  } = useTareas();

  const onSubmit = handleSubmit(async (data) => {
    let tarea;
    if (!params.id) {
      const res = await crearTarea(data);
      navigate("/tareas");
    } else {
      tarea = await editarTarea(params.id, data);
      navigate("/tareas");
    }
  });

  useEffect(() => {
    if (params.id) {
      cargarTarea(params.id).then((tarea) => {
        setValue("titulo", tarea.titulo);
        setValue("descripcion", tarea.descripcion);
      });
    }
  }, []);

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {tareasErrors.map((error, i) => (
          <p key={i} className="bg-red-500 text-white p-2"></p>
        ))}
        <h2 className="text-3xl font-bold my-4">Formulairo de tareas</h2>
        <form onSubmit={onSubmit}>
          <Label htmlFor="Titulo">Titulo</Label>
          <Input
            type="text"
            placeholder="Titulo"
            autoFocus
            {...register("titulo", { required: true })}
          />
          {errors.titulo && (
            <p className="text-red-500">El titulo es requerido</p>
          )}
          <Label htmlFor="Descripcion">Descripcion</Label>
          <TextArea
            type="text"
            placeholder="Descripcion"
            rows={3}
            {...register("descripcion")}
          />
          <Button>Guardar</Button>
        </form>
      </Card>
    </div>
  );
}

export default TareaFormPage;
