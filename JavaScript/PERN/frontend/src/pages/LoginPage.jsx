import { Card, Input, Button, Label, Container } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { signin, errors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signin(data);
    if(user){
      navigate("/profile");
    }

  });

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {errors &&
          errors.map((error) => (
            <p className="bg-red-500 text-white p-2">{error}</p>
          ))}
        <h1 className="text 4x1 font-bold my-2 text-center">Iniciar Sesion</h1>

        <form onSubmit={onSubmit}>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Ingrese su Email"
            {...register("email", { required: true })}
          ></Input>

          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            placeholder="Ingrese su Contraseña"
            {...register("password", { required: true })}
          ></Input>

          <Button>Ingresar</Button>
        </form>
        <div className="flex flex-col my-4">
          <p>¿No tienes Cuenta?</p>
          <Link to="/register">Registrate</Link>
        </div>
      </Card>
    </Container>
  );
}

export default LoginPage;
