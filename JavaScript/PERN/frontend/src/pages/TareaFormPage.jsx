import { required } from "zod/mini";
import { Button, Card, Input, Label, TextArea } from "../components/ui";
import { useForm } from "react-hook-form";
import { crearTareaRequest } from "../api/tareas.api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TareaFormPage() {
  const { register, handleSubmit, formState:{errors} } = useForm();
  const [postError, setPostError] = useState([]);
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await crearTareaRequest(data);
      navigate("/tareas")
    } catch (error) {
      setPostError([error.response.data.message])
    }
  });

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {
          postError.map((error,i) => (
            <p key={i} className="bg-red-500 text-white p-2"></p>
          ))
        }
        <h2 className="text-3xl font-bold my-4">Formulairo de tareas</h2>
        <form onSubmit={onSubmit}>
          <Label htmlFor="Titulo">Titulo</Label>
          <Input
            type="text"
            placeholder="Titulo"
            autoFocus
            {...register("titulo", { required: true })}
          />
          {
            errors.titulo && (
              <p className="text-red-500">El titulo es requerido</p>
            )
          }
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
