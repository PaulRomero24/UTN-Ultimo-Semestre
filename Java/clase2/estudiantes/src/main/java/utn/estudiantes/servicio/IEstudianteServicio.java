package utn.estudiantes.servicio;

import java.util.List;

import utn.estudiantes.modelo.Estudiantes2026;



public interface IEstudianteServicio {
    public List<Estudiantes2026> listarEstudiante();
    public Estudiantes2026 buscarEstudiantePorId(Integer idEstudiante);
    public void guardarEstudiante(Estudiantes2026 estudiante);
    public void eliminarEstudiante(Estudiantes2026 estudiante);
}
