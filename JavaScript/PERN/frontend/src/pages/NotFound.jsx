import { Link } from "react-router-dom"
import {Card} from "../components/ui/Card"

function NotFound() {
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
    <Card>
        <h1 className="text-4x1 font-bold my-2 text-center">404</h1>
        <p className="text-x1 text-center">Pagina no encontrada</p>
        <Link to="/" className="text-blue500 hover:underline">Volver al Inicio</Link>
    </Card>
    </div>

  )
}

export default NotFound