import Navbar from "./components/navbar/Navbar";
import { Container } from "./components/ui";

import { Routes, Route } from "react-router-dom";
import { ProtectedRoute,redirectTo } from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import TareaFormPage from "./pages/TareaFormPage";
import TareasPage from "./pages/TareasPage";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";

function App() {
  const {isAuth} = useAuth()
  
  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Routes>
          {/*RUTAS PUBLICAS*/}
          <Route element={<ProtectedRoute isAllowed={!isAuth} redirectTO="tareas" />} /> 
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

          {/*RUTAS PRIVADAS*/}
          <Route element={<ProtectedRoute isAllowed={isAuth} redirectTo="/login"/>}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/task" element={<TareasPage />} />
            <Route path="/form/create" element={<TareaFormPage />} />
            <Route path="/form/edit/:id" element={<TareaFormPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
