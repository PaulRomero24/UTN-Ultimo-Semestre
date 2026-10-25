import { Link, useLocation } from "react-router-dom";
import { PrivateRoutes, publicRoutes } from "./navigation";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const { isAuth, signout } = useAuth();

  return (
    <nav className="bg-zinc-950">
      <Container className=" flex justify-between items-center py-3">
        <Link to="/">
          <h1 className="text-2xl font-bold text-white">PROYECTO PERN</h1>
        </Link>

        <ul className="flex gap-x-2">
          {isAuth
            ? <>
            {/*Recorrido de mapa del navigation // PRIVADAS PRIMERO + SIGNOUT --PUBLICAS LUEGO  */}
            {  
              PrivateRoutes.map(({ name, path }) => (
                <li
                  key={name}
                  className={`text-slate-300 ${
                    location.pathname === path && "bg-sky-500 px-3 py-1"
                  }`}
                >
                  <Link to={path}>{name}</Link>
                </li>
              ))
            }
            <li onClick={() => signout()}>Salir</li>
            
            </>
            
            
            : publicRoutes.map(({ name, path }) => (
                <li
                  key={name}
                  className={`text-slate-300 ${
                    location.pathname === path && "bg-sky-500 px-3 py-1"
                  }`}
                >
                  <Link to={path}>{name}</Link>
                </li>
              ))}
        </ul>
      </Container>
    </nav>
  );
}

export default Navbar;
